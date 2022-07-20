'use strict'

const MessageController = require('../controllers/MessageController.js')

module.exports = app => {
  
  // Create new message
  app.route('/message/:invite_id').post( MessageController.postMessage )

}
