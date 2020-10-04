const express = require('express');
const app = express();
const ejs = require('ejs');

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


const port = 3000;
app.listen(port, () => console.log("Example app listening on port!"));