'use strict'

const { user } = require('../database').models
const InviteController = require('./InviteController.js')

module.exports = {
  
  async index(req, res) {
    res.render('pages/dashboard.ejs', { headers: req.headers, invites: await InviteController.index(), nums: 1 })
  }
}
