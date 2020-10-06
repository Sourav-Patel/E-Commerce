require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');



// Connecting MongoDB 

mongoose.connect(process.env.MONGOLAB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

// Importing Schemas 

const Product = require(__dirname + "/schemas/Product");
const Customer = require(__dirname + "/schemas/Customer");


AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    companyName: 'AVR Sol',
    logo: "../images/logo.png",
    softwareBrothers: false
  },
  dashboard:{
      component:"cate1"
  }
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASS,
};

const adminrouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN
    }
    return null
  },
  cookieName: process.env.ADMIN_COOKIE_NAME,
  cookiePassword: process.env.ADMIN_COOKIE_PASS,
  resave: true,
    saveUninitialized: true
});


app.use(adminBro.options.rootPath, adminrouter);

app.use(express.static('public'));
app.set('view engine', 'ejs');

require('./routes/home')(app);

require('./routes/contact')(app);


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