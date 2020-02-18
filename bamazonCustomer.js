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

                console.log("LOOK HERE: ", results)

                //  CHECK THAT STORE HAS ENOUGH PRODUCT FOR USER REQUEST

                if (results[0].stock_quantity >= answer.quantityDesired) {

                    // UPDATE SQL DATABASE TO REFLECT REMAINING QUANTITY
                    var newStockQuantity = results[0].stock_quantity - answer.quantityDesired;

                    let newProductSales = ((results[0].price * answer.quantityDesired) + results[0].product_sales)

                    console.log("NEW SALES: ", newProductSales)
                    
                    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStockQuantity, answer.idDesired], function (error, results, fields) {
                        if (error) throw error;
                    });

                    connection.query('UPDATE products SET product_sales = ? WHERE item_id = ?', [newProductSales, answer.idDesired], function (error, results, fields) {
                        if (error) throw error;
                    })
                    
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

