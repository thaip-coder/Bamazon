var inquirer = require('inquirer');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '2222',
    database: 'bamazon'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected as ID: ' + con.threadId);
    con.end();
});


function buy() {
    console.table()
    inquirer.prompt({
        name: "buy",
        type: "list",
        message: "What would you like to purchase?"
    });
};