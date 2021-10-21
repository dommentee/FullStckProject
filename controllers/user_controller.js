const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const Users = require('../models/user.js')

users.get('/new', (req, res) => {
  res.render(
    'users/new_user.ejs',
  )
})

//create user
//add bcrypt
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  Users.create(req.body, (error, createdUser) => {
    console.log('created user', createdUser);
    res.redirect('/')
  })
})


module.exports = users