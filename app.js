const express = require('express');
const app = express();
const ejs = require('ejs');
const mysql = require('mysql');

// Establishing DB 

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "e_com"
// });

// //   Connecting to DB 

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");

//     // for creating DB 

//     con.query("CREATE DATABASE IF NOT EXISTS e_com", function (err, result) {
//         if (err) throw err;
//         console.log("Database created");

//         var sql = "CREATE TABLE IF NOT EXISTS customers ( id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, fname VARCHAR(255) NOT NULL, lname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, state VARCHAR(255) NOT NULL, orders VARCHAR(255) NOT NULL, creationDate DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)";
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("Table created");
//         });
//     });
// });

// Creating table in db 



app.use(express.static('public'));
app.set('view engine', 'ejs');

app.route('/').get(function (req, res) {
    // Get Method for Home
    res.render('home');
}).post(function (req, res) {
    // Post Method for Home
});

app.route('/contact').get(function (req, res) {
    res.render('contact');
    // Get Method Function for Contact
}).post(function (req, res) {
    // Post Method Function for contact
});

app.route('/about').get(function (req, res) {
    res.render('about');
    // Get Method Function for Contact
}).post(function (req, res) {
    // Post Method Function for contact
});

app.route('/blog').get(function (req, res) {
    res.render('blog');
    // Get Method Function for Contact
}).post(function (req, res) {
    // Post Method Function for contact
});

app.route('/login').get(function (req, res) {
    // Get Method for Login
    res.render('login');
}).post(function (req, res) {
    // Post Method for Login
});

app.route('/register').get(function (req, res) {
    // Get Method for register
    res.render('register');
}).post(function (req, res) {
    // Post Method for register
});

app.route('/forgot-password').get(function (req, res) {
    // Get Method for Forgot Password
    res.render('forgot-password');
}).post(function (req, res) {
    // Post Method for Forgot Password
});

app.route('/checkout').get(function (req, res) {
    // Get Method for Checkout
    res.render('checkout');
}).post(function (req, res) {
    // Post Method for Checkout
});

app.route('/product').get(function (req, res) {
    // Get Method for Checkout
    res.render('product');
}).post(function (req, res) {
    // Post Method for Checkout
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
  console.log("Server Started Sucessfully on Port 5000 !");
};

app.listen(port, function (reqest, response) {
  console.log("Server Started Sucessfully !");
});