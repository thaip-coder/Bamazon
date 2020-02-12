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
    con.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;

        //Displays products
        console.table(res);

        //Initiates product and quantity selection
        purchase();
    });
};

//Product and Quantity selection function
function purchase() {
    con.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
            name: "choice",
            type: "input",
            message: "Input ID of item you would like to purchase.",
            validate: function(value) {

                //Validates if input is a number
                var pass = value.match(/\d/g);
                if (pass) {
                    return true;
                }
                return "Please enter a number ID"            
            }
            },
            {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function(value) {

                //Validates if input is a number
                var pass = value.match(/\d/g);
                if (pass) {
                    return true;
                }
                return "Please enter a number quantity"            
            }
            }
        ])
        .then(function(ans) {

            //Traverses the array to locate the item the user selected
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (ans.choice == res[i].item_id) {
                    chosenItem = res[i];
                    console.log("You have chosen " + ans.quantity + " of " + chosenItem.product_name);
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

                    //Prompts the user to continue shopping or not
                    inquirer.prompt([
                        {
                            name: "continue",
                            type: "confirm",
                            message: "Do you want you to continue shopping?"
                        }
                    ])
                    .then(function(ans) {
                        if (ans.continue == true) {
                            purchase();
                        } else if (ans.continue == false) {
                            console.log("Come back soon!");
                            con.end();
                        }
                    })
                })

            //If not in stock, notifies customer and ends transaction
            } else if (chosenItem.stock_quantity <= ans.quantity) {
                console.log("Sorry, Insufficient Quantity.")

                //Prompts the user to continue shopping or not
                inquirer.prompt([
                    {
                        name: "continue",
                        type: "confirm",
                        message: "Do you want you to continue shopping?"
                    }
                ])
                .then(function(ans) {
                    if (ans.continue == true) {
                        purchase();
                    } else if (ans.continue == false) {
                        console.log("Come back soon!");
                        con.end();
                    }
                })
            };
        });
    });
};







