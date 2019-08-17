DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(20),
    price INTEGER(255),
    stock_quantity INTEGER(100),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wilson Prostaff", "racquets", 200, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yonex Vcore", "racquets", 150, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Head Radical", "racquets", 125, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Babolat Pure Aero", "racquets", 100, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wilson Federer DNA 12R", "bags", 175, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Babolat Pure 12R", "bags", 105, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Head Djokovic 12R", "bags", 150, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Asics Gel Resolutions 7", "shoes", 100, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Zoom Vapor", "shoes", 95, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Barricades", "shoes", 85, 15);


