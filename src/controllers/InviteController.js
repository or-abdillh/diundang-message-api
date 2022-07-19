'use strict'

require('dotenv').config({ path: process.cwd() + '/.env' })

const { invite } = require('../database').models
const jwt = require('jsonwebtoken')

module.exports = {

  async createInvite(req, res) {
    // Get title input
    const { title } = req.body

    //Generate token
    const token = jwt.sign( { title }, process.env.JWT_SECRET, { expiresIn: '14d' } )

    try {
      const inserted = await invite.create({
        title,
        token
      })

      // Decoded JWT
      const decoded = jwt.verify( inserted.dataValues.token, process.env.JWT_SECRET )

      res.render('pages/invite.ejs', { data: inserted.dataValues, decoded, url: req.headers.host })
    } catch( err ) { res.render('501.ejs', { headers: req.haders, err }) }
  },

  async destroyInvite(req, res) {
    // Parse params
    const { id } = req.params

    try {
      await invite.destroy({ where: { id } })
      res.redirect('/')
    } catch(err) { res.render('501.ejs', { err }) }
  }
}
