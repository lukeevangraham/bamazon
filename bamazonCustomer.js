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


            console.log(answer);
            // var query = "SELECT stock_quantity FROM bamazon.products WHERE item_id = ?";
            var query = "SELECT stock_quantity FROM bamazon.products WHERE item_id = '" + answer.idDesired + "'";


            // console.log("the query is" + query)
            console.log(answer.idDesired);

            // connection.query('SELECT * FROM bamazon.products WHERE item_id = "1"', function (err, results, fields) {
            connection.query(query, {item_id: answer.idDesired}, function (err, results, fields) {

                if (err) throw err;

                console.log(results[0].stock_quantity)
                console.log(results[0])


                if (results[0].stock_quantity >= answer.quantityDesired) {
                    console.log("you can purchase that");
                    // UPDATE SQL DATABASE TO REFLECT REMAINING QUANTITY
                    var newStockQuantity = results[0].stock_quantity - answer.quantityDesired;
                    console.log(newStockQuantity)
                    console.log(answer.idDesired);

                    // var query2 = `UPDATE products SET stock_quantity = ` + answer.idDesired + `, WHERE item_id = ` + answer.idDesired `;`

                    // console.log(query2);

                    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newStockQuantity, answer.idDesired], function(error, results, fields) {
                        if (error) throw error;
                    });

                    // connection.query(query2, 
                        
                    //     // "UPDATE products SET ? WHERE ?",
                    //     // [
                    //     //     {
                    //     //         stock_quantity: newStockQuantity
                    //     //     },
                    //     //     {
                    //     //         id: answer.idDesired
                    //     //     }
                    //     // ],
                    //     function(error) {
                    //         if (error) throw err;
                    //         console.log("Order going through\n");
                    //     }
                    // )

                

                    // SHOW CUSTOMER TOTAL COST OF PURCHASE
                    connection.end();
                } else {
                    console.log("Insufficient quantity!");
                    runSearch();
                }
              });

            // console.log(quantityAvailable)
            // if (answer.idDesired > ) {

            // }
        })
    }






//  CHECK THAT STORE HAS ENOUGH PRODUCE FOR USER REQUEST

//  IF NOT STATE "INSUFFICIENT QUANTITY!" AND STOP ORDER

//  IF PRODUCT IS AVAILABLE FULFILL ORDER

// UPDATE SQL DATABASE TO REFLECT REMAINING QUANTITY

// SHOW USER TOTAL PURCHASE COST

