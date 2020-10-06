module.exports = function (app) {
    
app.route('/contact').get(function (req, res) {
    res.render('contact');
    // Get Method Function for Contact
}).post(function (req, res) {
    // Post Method Function for contact
});
}