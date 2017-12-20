const express = require('express')
const bodyParser = require("body-parser");
const session = require('express-session');

require('dotenv').config();

const checkForSession = require('./middlewares/checkForSession');
const  controll_swag = require('./controllers/swag_controllers');
const ctrl = require('./controllers/auth_controller');
const cartCtrl = require('./controllers/cart_controllers');
const search_ctrl = require('./controllers/search_ctrl')

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true
}));

app.use(checkForSession);
app.use( express.static( `${__dirname}/build` ) );

app.get('/api/swag', controll_swag.read);
console.log('index.js swag ctrl', controll_swag)

app.post('/api/login', ctrl.login);
console.log('index.js login', ctrl.login)

app.post('/api/register', ctrl.register);
console.log('index.js register', ctrl.register)

app.post('/api/signOut', ctrl.signOut);
console.log('index.js signout', ctrl.signOut);

app.get('/api/user', ctrl.getUser);
console.log('index.js getuser', ctrl.getUser);
//express.get 'swag' from server amd return results of getting swag products

//endpoints from cart_controller.js

app.post('/api/cart', cartCtrl.add);
console.log('index.js cartCrtl.add', cartCtrl.add);

app.post('/api/cart', cartCtrl.checkout);
console.log('index.js cart.checkout', cartCtrl.checkout);

app.delete('/api/cart', cartCtrl.delete);
console.log('index.js cart.deldete', cartCtrl.delete);

//endpoint from search_ctrl
app.get('/api/search', search_ctrl.search);
console.log('index.js search')

const port = process.env.PORT || 3505;

app.listen(port, () => {console.log(`server is listening on port ${port}`)})