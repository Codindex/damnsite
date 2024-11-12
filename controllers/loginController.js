exports.login = function(req, res) {
    // Update session.name when button pressed
    req.session.user = req.params.pseudo
    req.session.password = req.params.password
    req.cookies.user = req.params.pseudo
    req.cookies.password = req.params.password
    res.redirect('/academy');
}