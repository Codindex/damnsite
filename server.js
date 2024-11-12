let express = require('express');
let cookieParser = require('cookie-parser');

// Database
let connection = require('./db');

let app = express();

app.use(express.urlencoded({extended: true}));

// Cookies
app.use(cookieParser());

// session
let session = require("express-session");
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true
}));

// Router
let routes = require('./router');

app.use('/', routes);



app.use(express.static('public'));

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});