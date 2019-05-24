DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id BIGINT AUTO_INCREMENT,
    product_name VARCHAR(200),
    department_name VARCHAR(100),
    price DOUBLE,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Captain Crunch","Food",4,40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Express In Action","Book",14,3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Cinema Display 30","Electronics",200,2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Minute Maid Berry Punch","Food",3.99,20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Reese's Peanut Butter Cups","Candy",1.29,300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Forest Gump DVD","Movies",5.99,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iPhone XR","Phones",7.99,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tivo Bolt 500","Electronics",199.99,5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Graco Blossom High Chair","Household",189.99,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dragon Beta Fish","Animals",24.99,8);

SELECT * FROM products