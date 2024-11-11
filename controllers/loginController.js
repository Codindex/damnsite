exports.login = function(req, res) {
    // Update session.name when button pressed
    req.session.user = req.params.pseudo
    res.redirect('/academy');
}