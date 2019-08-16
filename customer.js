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

//Initiates product selection
function purchase() {
    inquirer.prompt({
        name: "buy",
        type: "input",
        message: "Input ID of item you would like to purchase."
    });
}



