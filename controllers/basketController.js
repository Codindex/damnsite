exports.basket_list = []

exports.basket = function(req, res) {
    // Show basket (not yet in sql database)
    res.redirect('/academy');
}

exports.delete = function(req, res) {
    res.redirect('/academy/basket');
}