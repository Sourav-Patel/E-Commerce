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
    // Get Method Function for Contact
 }).post(function (req, res) { 
     // Post Method Function for contact
  });

app.route('/login').get(function (req, res) {
    // Get Method for Login
    res.render('login')
}).post(function (req, res) { 
    // Post Method for Login
 });

app.route('/register').get(function (req, res) { 
    // Get Method for register
 }).post(function (req, res) { 
     // Post Method for register
  });

const port = 3000;
app.listen(port, () => console.log("Example app listening on port!"));