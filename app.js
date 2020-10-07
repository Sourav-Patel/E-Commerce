require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


// Connecting MongoDB

mongoose.connect(process.env.MONGOLAB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

// Importing Schemas 

const Product = require(__dirname + "/schemas/Product");
const Customer = require(__dirname + "/schemas/Customer");
const Blog = require(__dirname + "/schemas/blog");


// Admin Bro Adapter

AdminBro.registerAdapter(AdminBroMongoose);


// Admin bro options 

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin',
    branding: {
        companyName: 'AVR Sol',
        logo: "../images/logo.png",
        softwareBrothers: false
    },
});

// Creating Admin Password
const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS,
};

// Creting Admin bro router 
const adminrouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {


        if (ADMIN.password === hashed && ADMIN.email === email) {
            return ADMIN
        }
        return null
    },
    cookieName: process.env.ADMIN_COOKIE_NAME,
    cookiePassword: process.env.ADMIN_COOKIE_PASS,
    resave: true,
    saveUninitialized: true
});

//Using Admin bro router
app.use(adminBro.options.rootPath, adminrouter);

// Making static folder 
app.use(express.static('public'));

// Set view engine to ejs 
app.set('view engine', 'ejs');

// Using old body parser 
app.use(bodyParser.urlencoded({
    extended: false
}));

// Requiring routes 
require('./routes/home')(app);
require('./routes/contact')(app);

// More Routes 
app.route('/about').get(function (req, res) {
    res.render('about');
    // Get Method Function for Contact
}).post(function (req, res) {
    // Post Method Function for contact
});

app.route('/blog').get(function (req, res) {
    // Searching for Blogs from DB 
    Blog.find({}, function (err, result) {
        // Rendering blog.ejs and passed finded blogs array as result 
        res.render('blog', {
            blogs: result
        });
    });
}).post(function (req, res) {
    // Post Method Function for contact
});

app.route('/login').get(function (req, res) {
    // Get Method for Login

    // Render login page 
    res.render('login');
}).post(function (req, res) {
    // Post Method for Login

    // Finding customer by email from DB 
    Customer.findOne({
        email: req.body.email
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {

            // Comparing hashed password via bcrypt 
            bcrypt.compare(req.body.password, result.password, function (err, result) {
                // if result == true
                if (result) {
                    console.log("logged in successfully");
                    // Redirecting to home route after authentication (aunthentication pending)
                    res.redirect("/");
                } else {
                    console.log("Password not Matched");
                }
            });
        };
    });
});

app.route('/register').get(function (req, res) {
    // Get Method for register

    // Rendering register.ejs 
    res.render('register');
}).post(function (req, res) {
    // Post Method for register

    // Storing registered user information and hashing password
    bcrypt.hash(req.body.password, 5, function (err, hash) {
        // Store hash in your password DB.
        var newUser = new Customer({
            first_name: req.body.fname,
            last_name: req.body.lname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: hash
        });

        // saving new user in DB 
        newUser.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            // After successfull save redirecting to login page
            res.redirect("/login");
        });
    });
});

app.route('/forgot-password').get(function (req, res) {
    // Get Method for Forgot Password

    // Rendring forgot-password.ejs 
    res.render('forgot-password');
}).post(function (req, res) {
    // Post Method for Forgot Password
});

app.route('/checkout').get(function (req, res) {
    // Get Method for Checkout

    // Rendring checkout.ejs 
    res.render('checkout');
}).post(function (req, res) {
    // Post Method for Checkout
});

app.route('/product').get(function (req, res) {
    // Get Method for Checkout

    // Rendring product.ejs 
    res.render('product');
}).post(function (req, res) {
    // Post Method for Checkout
});

// Listening App on ENV Port 
let port = process.env.PORT;

// Listening app on local host if env port not detected
if (port == null || port == "") {
    port = 3000;

};

app.listen(port, function (reqest, response) {
    console.log("Server Started Sucessfully on Port 3000 or ENV Port !");
});