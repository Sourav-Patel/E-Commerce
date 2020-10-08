const passport = require('passport');
const User = require("../models/Customer");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {

    User.findOne({
        'email': email
    }, function (err, user) {
        if (err) {
            return done(err);
        };
        if (user) {
            return done(null, false, {
                message: "Email or Mobile Number already Exist ! Please Login"
            })
        
        };

        bcrypt.hash(req.body.password, 5, function (err, hash) {
            // Store hash in your password DB.
            var newUser = new User({
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
                    return done(err);
                } else {
                    return done(null, newUser);
                };
            });
        });
    });
}));