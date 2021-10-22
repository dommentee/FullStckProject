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

//create
arts.post('/', (req, res) => {
  Arts.create(req.body, (error, uploadedWork) => {
    res.redirect('/arts')
  })
})

//findall
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

//finding each uploaded art by id
arts.get('/:id', (req, res) => {
  Arts.findById(req.params.id, (error, foundUpload) => {
    res.render(
      'show_art.ejs',
      {
        upload: foundUpload,
        currentUser: req.session.currentUser 
      }
    )
  })
})

//form for new creattion
arts.get('/new', (req, res) => {
  res.render(
    'new_art.ejs',
    { currentUser: req.session.currentUser }
  )
})

//show selected



module.exports = arts
