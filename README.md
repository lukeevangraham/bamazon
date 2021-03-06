# bamazon

## Overview

Usage demonstration found at this video link:  https://www.youtube.com/watch?v=dqKEz1knSqU

## Installing

To run the app locally, you will first need to git clone the repository to your local machine.

HTTPS:

$ git clone https://github.com/lukeevangraham/bamazon.git

SSH:

$ git clone git@github.com:lukeevangraham/bamazon.git
Once cloned, cd into the repository and install the necessary dependencies by running:

$ npm install
You can then run the app in the customer view by running:

$ node bamazonCustomer.js

## Using the app

### Customer View:
Luanch the customer view by typing
$ node bamazonCustomer

This application first displays all of the items available for sale including the ids, names, and prices of products for sale.

Then the user is prompted with two message:
   * The first asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.
   
After the user has places the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app displays the phrase `Insufficient quantity!`, and prevents the order from going through.

* However, if the store _does_ have enough of the product, the app fulfills the customer's order.
   * This updates the SQL database to reflect the remaining quantity and shows the customer the total cost of their purchase.




## Instructions

### Challenge #1: Customer View 

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.




### Challenge #2: Manager View (Next Level)

* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

- - -
