# Bamazon
Homework 12

1. The problem my app is trying to solve:
    - My app is trying to provide a way for the user to purchase goods from 3 categorioes
        1. Racquets
        2. Bags
        3. Shoes

2. How is the app organized:
    - First, globale requirements are established
        - Inquirer
        - MySql
    - Second, the MySql authentication information is presented
        - host, port, user, password, and database
    - Third, connection to MySql database is established
    - Fourth, process is run that takes user input to establish what is being purchased.

3. How to run the app:
    1. In the command line, to initiate the app, type (without quotations):
        - "node customer"
    2. Once the program is initiated, the products table will be displayed and you'll be presented with 2 questions:
        1. Input ID of item you would like to purchase.
            - Consult the table and input the ID number of the item you wish to purchase
        2. How many would you like to purchase?
            - Input the quantity you would like to purchase.
                - If quantity is available, purchase will be successful and total price will be displayed.
                - If quantity is not available, purchase will be unsuccessful and the user will be prompted to continue shopping or not. 
    3. After a successful/unsuccessful purchase, the program will prompt you to continue shopping or not.
        - If yes, the program will repeat step 2.
        - If no, the program will end.

4. Images of the code working

5. Deployed version of the app:
    - [Github Deployed Version](https://tp222.github.io/Bamazon/)

6. My app utilized the following:
    - Inquirer module
    - MySql module
    - MySql database

7. I developed this app as a homework assignment for my coding bootcamp. 
    
