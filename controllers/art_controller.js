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
arts.post('/', isAuth,(req, res) => {
  Arts.create(req.body, (error, uploadedWork) => {
    res.redirect('/arts')
  })
})
//update
arts.put('/:id',isAuth,(req, res) => {
  Arts.findByIdAndUpdate(req.params.id, req.body, (error, uploadToUpdate) => {
    res.redirect('/arts')
  })
})
//edit datase to add comment
arts.post('/:id/comment',isAuth, (req, res) => {
  Arts.findByIdAndUpdate(req.params.id, { $push: { comment: req.body.comment} }, (error, updatedComment) => {
    res.redirect(`/arts/${req.params.id}`)
  })
})


//delete 
arts.delete('/:id',isAuth, (req, res) => {
  Arts.findByIdAndRemove(req.params.id, (error, uploadToDelete) => {
    res.redirect('/arts')
  })
})

//find all
arts.get('/',isAuth, (req, res) => {
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

//form for new creattion
arts.get('/new', isAuth, (req, res) => {
  res.render(
    'new_art.ejs',
    { currentUser: req.session.currentUser }
  )
})

//finding each uploaded art by id
arts.get('/:id',isAuth, (req, res) => {
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

//edit upload
arts.get('/:id/edit',isAuth, (req, res) => {
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
