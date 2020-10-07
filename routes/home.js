// exporting home route

module.exports = function(app){

    app.route('/').get(function (req, res) {
        // Get Method for Home
        res.render('home');
    }).post(function (req, res) {
        // Post Method for Home
    });
} 