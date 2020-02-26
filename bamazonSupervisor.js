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
  getStartMenuSelection().then(callNextActionOrExit);
}

function getStartMenuSelection() {
  return inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["View Products Sales by Department", "Create New Department"],
      name: "userSelection"
    }
  ]);
}

// FUNCTION RESPONDING TO USER INPUT
function callNextActionOrExit(answer) {
  if (answer.userSelection === "View Products Sales by Department") {
    // console.log("You want to view products by department");
    viewProductsByDepartment();
  } else if (answer.userSelection === "Create New Department") {
    console.log("You want to create a new department");
    // viewLowInventory();
  } else {
    database.endConnection();
  }
}

function viewProductsByDepartment() {
    // let query = "SELECT department_name, SUM(product_sales - over_head_costs) AS total_profit FROM products INNER JOIN departments USING (department_name) GROUP BY department_name;"
    // let query = "SELECT department_name, SUM(product_sales) AS product_sales FROM products GROUP BY department_name;";
    let query = "SELECT p.department_name, SUM(d.over_head_costs) AS over_head_costs, p.product_sales, SUM(p.product_sales - d.over_head_costs) AS total_profit FROM products p RIGHT JOIN departments d ON p.department_name = d.department_name GROUP BY p.department_name, p.product_sales"

    let newProductList

    connection.query(query, function(err, res) {
        if (err) throw err;

        console.table(res);

    })

    // THE FOLLOWING CODE BROUGHT OVER ALL DEPARTMENT NAMES TO THE DEPARTMENTS TABLE
//   let query =
//     "SELECT department_name, SUM(product_sales) AS product_sales FROM products GROUP BY department_name;";
//   let newProductList = [];

//   connection.query(query, function(err, res) {
//     if (err) throw err;

//     res.forEach(product => {
//       let newProduct = {};
//       newProduct.department_name = product.department_name;
//       newProduct.product_sales = product.product_sales;
//       newProductList.push(newProduct);
//     });
//     console.log(newProductList);

//     // query database for existing departments in departments table
//     query = "SELECT * FROM departments";
//     let departmentList;

//     connection.query(query, function(err, res) {
//       if (err) throw err;

//         newProductList.forEach(product => {
//             let productMatch = false;
//             res.forEach(department => {
//                 if (product.department_name === department.department_name) {
//                     productMatch = true;
//                 }
//             });
//             if (productMatch === false) {
//                         connection.query(
//                 "INSERT INTO departments SET ?",
//                 {
//                     department_name: product.department_name
//                 },
//             );
    
//             }
            
//         });
//     });
//   });
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  start();
});
