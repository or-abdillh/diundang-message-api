'use strict'

const { message } = require('../database').models

module.exports = {
  // get all message by invite_id
  async index(req, res) {
    const { invite_id } = req.params

    try {
      const messages = await message.findAll({ where: { invite_id } })
      res.render('pages/messages', { messages, url: req.headers.host, invite_id })
    } catch(err) { res.render('501.ejs', { err }) }
  },

  async destroyMessage(req, res) {
    // Get params
    const { invite_id, message_id } = req.params

    try {
      await message.destroy({ where: { invite_id, id: message_id } })
      res.redirect('/message/' + invite_id)
    } catch( err ) { res.render('501.ejs', { err }) }
  }
}
