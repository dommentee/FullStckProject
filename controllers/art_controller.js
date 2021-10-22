const { application } = require('express');
const express = require('express')
const arts = express.Router();
//call schema from models
const Arts = require('../models/art.js')

const isAuth = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}
arts.post('/', (req, res) => {
  Arts.create(req.body, (error, uploadedWork) => {
    res.redirect('/arts')
  })
})


arts.get('/', (req, res) => {
  Arts.find({}, (error, allUploads) => {
    res.render(
      'art_index.ejs',
      {
        uploads: allUploads,
        currentUser: req.session.currentUser 
      }
  
    )
  })
})

arts.get('/new', (req, res) => {
  res.render(
    'new_art.ejs',
    { currentUser: req.session.currentUser }
  )
})




module.exports = arts
