'use strict'

require('dotenv').config({ path: process.cwd() + '/.env' })

const jwt = require('jsonwebtoken')
const { message, invite } = require('../database').models
const { success, notFound, forbidden, internalServerError } = require('../response')

module.exports = {
  // get all message by invite_id
  async index(req, res) {
    const { invite_id } = req.params

    try {
      const messages = await message.findAll({ where: { invite_id } })
      res.render('pages/messages', { messages, url: req.headers.host, invite_id })
    } catch(err) { res.render('501.ejs', { err }) }
  },
  
  async apiIndex(req, res) {
    const { invite_id } = req.params

    try {
      const messages = await message.findAll({ where: { invite_id } })
      success({ messages }, res)
    } catch(err) { internalServerError(err, res) }
  },

  async destroyMessage(req, res) {
    // Get params
    const { invite_id, message_id } = req.params

    try {
      await message.destroy({ where: { invite_id, id: message_id } })
      res.redirect('/message/' + invite_id)
    } catch( err ) { res.render('501.ejs', { err }) }
  },

  // Create new messages
  async postMessage(req, res) {
    // Parse form
    const { writer, content, presence } = req.body
    // parse params
    const {  invite_id } = req.params
    // parse headers
    const { token } = req.headers

    // Verify token
    try {
      const selected = await invite.findOne({ where: { id: invite_id, token } })
      if ( selected ) {
        jwt.verify( token, process.env.JWT_SECRET, async (err, decoded) => {
          if (!err) { // Token valid
            // Create new message
            await message.create({ writer, content, presence, invite_id })
            success('Success post new message', res)
          } else forbidden('JWT err : ' + err, res)
        })
      } else notFound('Token not found', res)
    } catch(err) { internalServerError(err, res) } 
  }
}
