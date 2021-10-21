const bcrypt = require('bcrypt');
const express = require('express');
//use sessions from express 
const sessions = express.Router()
//User Schema is need to compare
const User = require('../models/user.js')

//use router
sessions.get('/new', (req, res) => {
  res.render(
    'sessions/new_sessions.ejs',
    { currentUser: req.session.currentUser }
  )
})

//user bcrypt to  compare username and password
//sessions.post
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    if (error) {
      console.log(error);
      res.send('there was problem wiith username and password')
    } else if(!foundUser){
      res.send('<a href="/">Sorry no user</a>')
    } else {
      //if user found
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser//keeps user
        res.redirect('/')
      } else {
        res.send('<a href="/">password does not match</a>')
      }
    }
  })
})
//route to delete seeesion /log out 


module.exports = sessions