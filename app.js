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
var cookieParser = require('cookie-parser');
// var csrf = require('csurf');
var session = require('express-session')
const passport = require('passport');
const flash = require('connect-flash');
const {
    findById
} = require('./models/Customer');


// var csrfProtection = csrf();


// Connecting MongoDB

mongoose.connect(process.env.MONGOLAB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

// Importing Models

const Product = require(__dirname + "/models/Product");
const Customer = require(__dirname + "/models/Customer");
const Blog = require(__dirname + "/models/blog");



const cartSchema = mongoose.Schema({
    customerId: Object,
    cart: Object
});


const Cart = mongoose.model("Cart", cartSchema);

// Admin Bro Adapter

AdminBro.registerAdapter(AdminBroMongoose);


// Admin bro options 


const productParent = {
    name: 'Products',
    icon: 'Accessibility',
}

const userParent = {
    name: 'Customers',
    icon: 'Accessibility',
}

const blogParent = {
    name: 'Blogs',
    icon: 'Accessibility',
}

const adminBro = new AdminBro({
    dashboard: {
        component: AdminBro.bundle('./my-dashboard-component')
    },
    resources: [{
            resource: Product,
            options: {
                parent: productParent
            }
        },
        {
            resource: Customer,
            options: {
                parent: userParent,
                properties: {
                    password: {
                        isVisible: {
                            list: false,
                            filter: false,
                            show: false,
                            edit: false
                        }
                    }
                }
            }
        },
        {
            resource: Blog,
            options: {
                parent: blogParent
            }
        }
    ],
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



// Using Cookie Parser 
app.use(cookieParser());

// Using sessions 
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');
var Cart_loc = require('./models/cart');
const cart = require('./models/cart');
// Using csurf 
// app.use(csrfProtection);

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    
    res.locals.session = req.session;
  
    next();
});

app.all("*", function (req, res, next) { 
    res.locals.cart = null;
    if (req.isAuthenticated()) {
        res.locals.userId = req.user.id;
        Cart.findOne({customerId : req.user.id}, function (err, result) { 
            if (err) {
                console.log(err);
                res.locals.cart = null;
            }
            if (result) {
                res.locals.cart = result;
            }
            if (!result) {
                res.locals.cart = null;
            }
            
         })
    }
    next();
 });

// Requiring routes 

require('./routes/contact')(app);

app.route('/').get(function (req, res) {
    // Get Method for Home
    Product.findOne({}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.render('home', {
                product: result
            });
        }
    });

}).post(function (req, res) {
    // Post Method for Home
});

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

app.route('/login').get(notLoggedIn, function (req, res) {
    // Get Method for Login

    // Render login page 
    var messages = req.flash("error");
    // csrfToken: req.csrfToken()
    // Rendering register.ejs 
    res.render('login', {
        messages: messages,
        hasError: messages.length > 0
    });
}).post(passport.authenticate("local.login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

app.route('/register').get(notLoggedIn, function (req, res) {
    // Get Method for register

    var messages = req.flash("error");
    // csrfToken: req.csrfToken()
    // Rendering register.ejs 
    res.render('register', {
        messages: messages,
        hasError: messages.length > 0
    });
}).post(passport.authenticate("local.signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/register",
    failureFlash: true
}));

app.route('/forgot').get(notLoggedIn, function (req, res) {
    // Get Method for Forgot Password

    // Rendring forgot-password.ejs 
    res.render('forgot-password');
}).post(function (req, res) {
    // Post Method for Forgot Password
});

app.route('/checkout').get(isLoggedIn, function (req, res) {
    // Get Method for Checkout

    // Rendring checkout.ejs 
    res.render('checkout');
}).post(isLoggedIn, function (req, res) {
    // Post Method for Checkout
});

app.route('/product').get(function (req, res) {
    // Get Method for Checkout

    // Rendring product.ejs 
    res.render('product');
}).post(function (req, res) {
    // Post Method for Checkout
});

app.route('/product/:productId').get(function (req, res) {
    // Get Method for Checkout
    var requestedId = req.params.productId;
    // Rendring product.ejs 
    res.render('product');
}).post(function (req, res) {
    // Post Method for Checkout
});

app.route("/add-to-cart/:id").get(isLoggedIn, function (req, res) {
    var productId = req.params.id;
    var cart;
    Cart.findOne({
        customerId: req.user.id
    }, function (err, foundCart) {
        if (err) {
            console.log(err);
        } if(foundCart) {
            
            var oldCart = foundCart.cart;

            var newCart = new Cart_loc(oldCart ? foundCart : {});

            Product.findById(productId, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }
                newCart.addItem(result, result.id);


                Cart.findOneAndUpdate({
                    customerId: req.user.id
                }, {
                    $set: {
                        cart: newCart
                    }
                }, null, function (err) {
                    if (!err) {
                        console.log("updated succesfully");
                    }
                })
                res.redirect('back');
            })

        } if (!foundCart) {

            var dummyCart = {cart: {
                items: null
            }};
            var newCart = new Cart_loc( dummyCart);

            Product.findById(productId, function (err, result) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }
                newCart.addItem(result, result.id);

                var toSave = new Cart({
                    customerId: req.user.id,
                    cart: newCart
                });
                toSave.save();
                res.redirect('back');
            })
        }

    })

});

app.route("/user/profile").get(isLoggedIn, function (req, res) {
    res.render('profile')
});

app.get("/user/logout", isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

app.get("/cart", function (req, res) {
    res.render('cart');
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}

function notLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        res.redirect("/");
    } else {
        next();
    }
}

app.use(function (req, res, next) {
    res.status(404).send("Aww... Looking for somwthing that is not exist. ㋡")
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