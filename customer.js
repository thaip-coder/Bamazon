//Node Module Variables
var inquirer = require('inquirer');
var mysql = require('mysql');

//Variable to create connection to MySql Database
var con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '2222',
    database: 'bamazon'
});

//Connecting to MySql Database
con.connect(function(err) {
    if (err) throw err;
    console.log('Connected as ID: ' + con.threadId);
    afterConnection();
});

//Shows products table on start-up
function afterConnection() {
    con.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        purchase();
    });
};

//Initiates product and quantity selection
function purchase() {
    con.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
            name: "choice",
            type: "input",
            message: "Input ID of item you would like to purchase."
            },
            {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?"
            }
        ])
        .then(function(ans) {
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (ans.choice == res[i].item_id) {
                    chosenItem = res[i];
                    console.log(chosenItem.product_name);
                }; 
            };

            //If in stock, fulfills customer's request
            if (chosenItem.stock_quantity >= ans.quantity) {
                console.log("Your order is being processed!")
                //Calculates new stock of product selected
                updatedStock = chosenItem.stock_quantity - ans.quantity;
                //Updates MySql with new stock quantity
                con.query("UPDATE products SET ? WHERE ?",
                [
                   {
                    stock_quantity: updatedStock
                   },
                   {
                    item_id: chosenItem.item_id
                   }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Purchase successful!");
                    //Shows customer cost of purchase(s)
                    console.log("Your total comes out to " + (ans.quantity * chosenItem.price) + "$.");
                    purchase();
                })
            //If not in stock, notifies customer and ends transaction
            } else if (chosenItem.stock_quantity <= ans.quantity) {
                console.log("Sorry, Insufficient Quantity.")
                con.end();
            };
        });
    });
};







