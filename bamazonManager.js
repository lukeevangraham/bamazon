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

function callNextActionOrExit(answer) {
    if (answer.userSelection === "View Products for Sale") {
        //   postAuction();
        console.log("You want to view products");
    }
    else if (answer.userSelection === "View Low Inventory") {
        //   bidAction();
        console.log("You want to view inventory")
    } else if (answer.userSelection === "Add to Inventory") {
        //   bidAction();
        console.log("You want to add to inventory")
    } else if (answer.userSelection === "Add New Product") {
        //   bidAction();
        console.log("You want to add a new product")
    } else {
        database.endConnection();
    }
}

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    getStartMenuSelection()
        .then(callNextActionOrExit)
});


function displayTable() {
    connection.query("SELECT * FROM bamazon.products", function (err, res) {
        if (err) throw err;

        //  FIRST DISPLAY ALL ITEMS AVAILABLE FOR SALE
        //  INCLUDING ID'S NAMES AND PRICES
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " ---- Product: " + res[i].product_name + " ---- Price: $" + res[i].price)
        }
        runSearch();
    });
}

//  THEN PROMPT USER WITH TWO MESSAGES

function runSearch() {
    //  ASK USER THE ID OF THE PRODUCT THEY WOULD LIKE TO BUY
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter ID of product you want to buy: ",
                name: "idDesired"
            },
            //  ASK USER HOW MANY UNITS OF THE PRODUCT THEY WOULD LIKE TO BUY
            {
                type: "input",
                message: "How many units of the product would you like to buy? ",
                name: "quantityDesired"
            }
        ])
        .then(function (answer) {

            // GET INFO FROM MYSQL ABOUT DESIRED ITEM
            var query = "SELECT * FROM bamazon.products WHERE item_id = '" + answer.idDesired + "'";

            connection.query(query, { item_id: answer.idDesired }, function (err, results, fields) {

                if (err) throw err;

                // IF INVENTORY CAN SUPPORT DESIRED QUANTITY

                if (results[0].stock_quantity >= answer.quantityDesired) {

                    // UPDATE SQL DATABASE TO REFLECT REMAINING QUANTITY
                    var newStockQuantity = results[0].stock_quantity - answer.quantityDesired;

                    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStockQuantity, answer.idDesired], function (error, results, fields) {
                        if (error) throw error;
                    });

                    // SHOW CUSTOMER TOTAL COST OF PURCHASE
                    var totalCost = results[0].price * answer.quantityDesired;
                    console.log(`\n\nOrder fulfilled!\n\nYour total is: $` + totalCost + `\n\n`);

                    connection.end();

                    // ELSE TELL CUSTOME "WE DON'T HAVE ENOUGH"
                } else {
                    console.log("Insufficient quantity!");
                    runSearch();
                }
            });
        })
}






//  CHECK THAT STORE HAS ENOUGH PRODUCE FOR USER REQUEST

//  IF NOT STATE "INSUFFICIENT QUANTITY!" AND STOP ORDER

//  IF PRODUCT IS AVAILABLE FULFILL ORDER

// UPDATE SQL DATABASE TO REFLECT REMAINING QUANTITY

// SHOW USER TOTAL PURCHASE COST

