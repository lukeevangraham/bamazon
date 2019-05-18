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

// LIST A SET OF MENU OPTIONS
function getStartMenuSelection() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                name: "userSelection"
            }
        ])
}

// FUNCTION RESPONDING TO USER INPUT
function callNextActionOrExit(answer) {
    if (answer.userSelection === "View Products for Sale") {
        console.log("You want to view products");
        viewProducts();
    } else if (answer.userSelection === "View Low Inventory") {
        console.log("You want to view inventory")
        viewLowInventory();
    } else if (answer.userSelection === "Add to Inventory") {
        console.log("You want to add to inventory")
        addToInventory();
    } else if (answer.userSelection === "Add New Product") {
        console.log("You want to add a new product")
        getNewItem();
    } else {
        database.endConnection();
    }
}

// VIEW PRODUCT FUNCTION LISTS EVERY AVAILABLE ITEM (IDs, names, prices, quantities)
function viewProducts() {
    connection.query("SELECT * FROM bamazon.products", function (err, res) {
        if (err) throw err;
        console.log("\n")
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " ---- Product: " + res[i].product_name + " ---- Price: $" + res[i].price + " ---- Quantity: " + res[i].stock_quantity)
        }
    })
    start();
}

// VIEW LOW INVENTORY LISTS ALL ITEMS WITH AN INVENTORY COUNT LOWER THAN FIVE
function viewLowInventory() {
    connection.query("SELECT * FROM bamazon.products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.log(`\n`)
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " ---- Product: " + res[i].product_name + " ---- Price: $" + res[i].price + " ---- Quantity: " + res[i].stock_quantity)
        }
    })
    start();
}

// ADD TO INVENTORY DISPLAYS A PROMPT THAT LETS MANAGER ADD MORE OF ANY ITEM CURRENTLY IN STORE
function addToInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the Item ID of the product you want to add more of: ",
                name: "desiredItemToAddInventory"
            },
        ])
        .then(function (answer) {
            connection.query("SELECT * FROM bamazon.products WHERE item_id = ?", [answer.desiredItemToAddInventory], function (err, res) {
                if (err) throw err;

                var newStockQuantity = res[0].stock_quantity + 10;

                connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStockQuantity, answer.desiredItemToAddInventory], function (error, results, fields) {
                    if (error) throw error;
                    console.log("\nInventory added!\n")
                    start();
                });
            })
        })
}


// ADD NEW PRODUCT ALLOWS MANGER TO ADD A COMPLETELY NEW PRODUCT TO STORE
function addNewItem(params) {
    getNewItem()
        .then(saveNewItem)
}

// PROMPT FOR NEW ITEM INFO
function getNewItem() {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the product you would like to add?",
                name: "product"
            },
            {
                type: "input",
                message: "What department would you like to place your item in?",
                name: "department"
            },
            {
                type: "input",
                message: "What is the unit price of this item?",
                name: "price",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                message: "How many units do you want to add?",
                name: "units",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(newItem) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: newItem.product,
                    department_name: newItem.department,
                    price: newItem.price || 0,
                    stock_quantity: newItem.units || 0
                },
                completeItemCreation
            );
        })
}


function completeItemCreation(err) {
    if (err) throw err;
    console.log("\nYour auction was created successfully!\n");
    // re-prompt the user for if they want to bid or post
    start();
  }

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    start();
});

