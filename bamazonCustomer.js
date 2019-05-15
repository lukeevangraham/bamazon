var mysql = require("mysql");

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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });


  function afterConnection() {
    connection.query("SELECT * FROM bamazon.products", function(err,res) {
      if (err) throw err;
          console.log(res);
          connection.end();
      })
    ;
  }



//  FIRST DISPLAY ALL ITEMS AVAILABLE FOR SALE
//  INCLUDING ID'S NAMES AND PRICES

//  THEN PROMPT USER WITH TWO MESSAGES

//  ASK USER THE ID OF THE PRODUCT THEY WOULD LIKE TO BUY

//  ASK USER HOW MANY UNITS OF THE PRODUCT THEY WOULD LIKE TO BUY

//  CHECK THAT STORE HAS ENOUGH PRODUCE FOR USER REQUEST

//  IF NOT STATE "INSUFFICIENT QUANTITY!" AND STOP ORDER

//  IF PRODUCT IS AVAILABLE FULFILL ORDER

    // UPDATE SQL DATABASE TO REFLECT REMAINING QUANTITY

    // SHOW USER TOTAL PURCHASE COST

