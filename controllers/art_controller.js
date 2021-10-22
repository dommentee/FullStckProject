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
//update
arts.put('/:id', (req, res) => {
  Arts.findByIdAndUpdate(req.params.id, req.body, (error, uploadToUpdate) => {
    res.redirect('/arts')
  })
})

//find all
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

//edit upload
arts.get('/:id/edit', (req, res) => {
  Arts.findById(req.params.id, (err, uploadToUpdate) => {
    res.render(
      'art_edit.ejs',
      {
        upload: uploadToUpdate,
        currentUser: req.session.currentUser 
      }
    )
  })
})



module.exports = arts
