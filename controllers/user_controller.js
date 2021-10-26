const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const Users = require('../models/user.js')


//create user
//add bcrypt
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  Users.create(req.body, (error, createdUser) => {
    res.redirect('/')
  })
})

//ejs file to crete user
users.get('/new', (req, res) => {
  res.render(
    'users/new_user.ejs',
    {
      currentUser: req.session.currentUser 
    }
    
  )
})

//userprofile
// users.get('/:id/', (req, res, next) => {
//   const user = req.params.id
//   Users.findOne({ user: username }, (error, foundUser) => {
    
//   })
// })

// users.get('/:id/', (req, res, next) => {
//   Users.findOne(req.users.id,(error, foundUser) => {
//     res.render(
//       'users/profile.ejs',
//       {
//         user: foundUser,
//         currentUser: req.session.currentUser 
//       }
//     )
//   })
// })

module.exports = users