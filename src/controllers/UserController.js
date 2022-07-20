'use strict'

const md5 = require('md5')
const { user } = require('../database').models
const InviteController = require('./InviteController.js')

module.exports = {
  
  async index(req, res) {
    res.render('pages/dashboard.ejs', { headers: req.headers, invites: await InviteController.index(), nums: 1 })
  },

  async login(req, res) {
    res.render('pages/login.ejs', { url: req.headers.host }, { err: false })
  },

  async userLogin(req, res) {
    // parse form
    const { username, password } = req.body

    try {
      const selected = await user.findOne({ where: { username, password: md5(password) } })
      if ( selected ) res.redirect('/')
      else res.render('pages/login.ejs', { url: req.headers.host, err: true })
    } catch( err ) { res.render('501.ejs'), { err } }  
  }
}
