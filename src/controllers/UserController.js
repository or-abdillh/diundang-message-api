'use strict'

const { user } = require('../database').models

module.exports = {
  
  index(req, res) {
    res.render('pages/dashboard.ejs')
  }
}
