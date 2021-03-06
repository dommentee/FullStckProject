//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const session = require('express-session')///need session for cookies to work

require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//users to be able to create a profile
//users can upload their art and usersers can set a price 
//store will have all arts for sale 
//users can browse withwout having to be logged in

//create home page and user signup/login 
//set up rotes and dynamic headers with css file 



//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)


//___________________
// Routes
//___________________
//localhost:3000
app.get('/', (req, res) => {
  res.render(
    'home.ejs',
    {
      currentUser: req.session.currentUser 
    }
  )
  // res.send('Hello World!');
});
//controllers

const usersController = require('./controllers/user_controller.js')
const sessionsController = require('./controllers/session_controller.js')
const artsController = require('./controllers/art_controller.js')
app.use('/arts', artsController)
app.use('/users', usersController)
app.use('/sessions', sessionsController)


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));