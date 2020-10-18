// exporting home route

module.exports = function(app){

    app.route('/').get(function (req, res) {
        // Get Method for Home
        Product.find({}, function (err, result) { 
            if (err) {
                console.log(err);
            }else{
                res.render('home', {product : result});
            }
         });
        
    }).post(function (req, res) {
        // Post Method for Home
    });
} 