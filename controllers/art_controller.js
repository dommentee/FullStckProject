const express = require('express')
const arts = express.Router();

const isAuth = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}


arts.get('/', isAuth, (req, res) => {
  res.render(
    'art_index.ejs',
    {
      currentUser: req.session.currentUser 
    }

  )
})



module.exports = arts
