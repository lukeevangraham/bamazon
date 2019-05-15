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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayTable();
});


function displayTable() {
    connection.query("SELECT * FROM bamazon.products", function (err, res) {
        if (err) throw err;

        // console.log(res)

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
    .prompt({
        name: "productDesired",
        type: "input",
        message: "Enter ID of product you want to buy: "
    })
    .then(function(answer) {
        //  ASK USER HOW MANY UNITS OF THE PRODUCT THEY WOULD LIKE TO BUY
        inquirer
        .prompt({
            name: "quantityDesired",
            type: "input",
            message: "How many units of the product would you like to buy? "
        })
        .then(console.log("Great!\n\n"));
    })
    connection.end();
}






//  CHECK THAT STORE HAS ENOUGH PRODUCE FOR USER REQUEST

//  IF NOT STATE "INSUFFICIENT QUANTITY!" AND STOP ORDER

//  IF PRODUCT IS AVAILABLE FULFILL ORDER

// UPDATE SQL DATABASE TO REFLECT REMAINING QUANTITY

// SHOW USER TOTAL PURCHASE COST

