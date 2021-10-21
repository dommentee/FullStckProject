const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();

users.get('/new', (req, res) => {
  res.render(
    'users/new_user.ejs'
  )
})

module.exports = users