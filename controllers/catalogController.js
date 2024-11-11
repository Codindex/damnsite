let connection = require("../db")

// let basket = require("./basketController").basket_list

let Panier = require("../models/basket")

let Inscription = require("../models/inscription")

const columns = [
    'Id',
    'Nom',
    'Prix',
    'Début',
    'Fin'
]

let courses = []

let panier = new Panier()

function select(req, res) {
    connection.query("SELECT * FROM courses;", function(err, results) {
        if (err) res.status(400).send(err);
        else {
            res.status(200);
            // tasklist = results.map(function(value) {return value.task});
            courses = results;
            // console.log(courses);
            res.render('home.ejs', {courses: courses, send: req.session.send, columns: columns});
        }
    });
}

function insert(req, res) {
    for (let course of panier.courses) {
        connection.query("INSERT INTO inscription set ?", new Inscription(req.session.user, course.Id), function(err, results) {
            if (err) res.status(400).send(err);
            else console.log("sent !");
        });
    }
    panier.courses = []
    res.render('home.ejs', {courses: courses, send: req.session.send, columns: columns});
}

// Main page
exports.catalogList = function(req, res) {
    // req.session.send = false;
    console.log(req.session.user);
    console.log(req.session.send);
    if (req.session.send) {
        insert(req, res);
    } else {
        select(req, res);
    }
}

exports.addToBasket = function(req, res) {
    // console.log(req.params.i)
    panier.courses.push(courses[req.params.i]);
    // console.log(panier.courses);
    res.redirect("/academy");
}

// Login screen
exports.login = function(req, res) {
    // console.log(req.body)
    // console.log(req.body.send)
    res.render('login.ejs', {send: req.session.send});
}

exports.loginSend = function(req, res) {
    // Update session.name when button pressed
    req.session.user = req.body.user;
    res.redirect('/academy');
}

// Basket screen
exports.basket = function(req, res) {
    // Show basket (not yet in sql database)
    res.render('basket.ejs', {columns: columns, courses: panier.courses});
}

exports.delete = function(req, res) {
    panier.courses.splice(req.params.i, 1);
    res.redirect('/academy/basket');
}

exports.send = function(req, res) {
    req.session.send = true
    if (req.session.user == undefined) {
        res.redirect('/academy/login');
    } else {
        res.redirect('/academy');
    }
}

exports.catalogSubmit = function(req, res) {
    res.render('home.ejs', {courses: courses, send: req.session.send, columns: columns});
}
// module.exports = catalogList;