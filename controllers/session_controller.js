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
  )
})

module.exports = sessions