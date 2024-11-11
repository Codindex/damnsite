let express = require('express');

let router = express.Router();

let catalogController = require('./controllers/catalogController');
// let loginController = require('./controllers/loginController');
// let basketController = require('./controllers/basketController');

// Redirect to homepage
router.get('/', (req, res) => res.redirect('/academy'));

// Homepage
router.get('/academy', catalogController.catalogList);
router.post('/academy/add/:i', catalogController.addToBasket);

// Login
router.get('/academy/login', catalogController.login);
router.post('/academy/login/save', catalogController.loginSend);

// Submission
router.get('/academy/basket', catalogController.basket);
router.get('/academy/basket/delete/:i', catalogController.delete);
router.get('/academy/basket/send', catalogController.send);

router.post('/academy', catalogController.catalogSubmit);

module.exports = router