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

function makeTable() {
  connection.query("SELECT * FROM products;", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  })
  
}

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
    promptCreateDepartment().then(createDepartment);
    // viewLowInventory();
  } else {
    database.endConnection();
  }
}

function promptCreateDepartment() {
  console.log("You want to create a new department");
  return inquirer.prompt([
    {
      type: "input",
      message: "Name of new department:",
      name: "newDepartmentName"
    },
    {
      type: "input",
      message: "What are the new department's over head costs?",
      name: "newDepartmentOverHeadCosts"
    }
  ])
}

function createDepartment(department) {
  // console.log("creating: ", department)

  let query = `"INSERT INTO departments SET ?",
  {
    department_name: department.newDepartmentName,
    over_head_costs: department.newDepartmentOverHeadCosts
  }`

  connection.query("INSERT INTO departments SET ?",
  {
    department_name: department.newDepartmentName,
    over_head_costs: department.newDepartmentOverHeadCosts
  }, function(err) {
    if (err) throw err;
    console.log("SUCCESS!")
    makeTable()
  })

}

function viewProductsByDepartment() {
  // let query = "SELECT department_name, SUM(product_sales - over_head_costs) AS total_profit FROM products INNER JOIN departments USING (department_name) GROUP BY department_name;"
  // let query = "SELECT department_name, SUM(product_sales) AS product_sales FROM products GROUP BY department_name;";
let query = "SELECT d.department_name, d.over_head_costs, SUM(IFNULL(p.product_sales, 0)) AS product_sales, SUM(IFNULL(p.product_sales, 0)) - d.over_head_costs AS total_profit ";
query += "FROM products p RIGHT JOIN departments d ON(p.department_name = d.department_name) GROUP BY d.department_name, d.over_head_costs";

  let newProductList;

  connection.query(query, function(err, res) {
    if (err) throw err;

    console.table(res);
    console.log("\n \n")
  });


  start()
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
