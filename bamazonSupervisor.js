var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

function start() {
    getStartMenuSelection()
        .then(callNextActionOrExit);
}

function getStartMenuSelection() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["View Products Sales by Department", "Create New Department"],
                name: "userSelection"
            }
        ])
}

// FUNCTION RESPONDING TO USER INPUT
function callNextActionOrExit(answer) {
    if (answer.userSelection === "View Products Sales by Department") {
        console.log("You want to view products by department");
        // viewProductsByDepartment();
    } else if (answer.userSelection === "Create New Department") {
        console.log("You want to create a new department")
        // viewLowInventory();
    } else {
        database.endConnection();
    }
}

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    start();
});