'use strict'

// Controllers
const UserController = require('../controllers/UserController.js')
const InviteController = require('../controllers/InviteController.js')
const MessageController = require('../controllers/MessageController.js')

module.exports = app => {

  // Dashboard
  app.route('/').get( UserController.index )
  
  //Invite
  app.route('/invite').post( InviteController.createInvite )
  app.route('/invite/destroy/:id').get( InviteController.destroyInvite )

  //Message
  app.route('/message/:invite_id').get( MessageController.index )
  app.route('/message/destroy/:invite_id/:message_id').get( MessageController.destroyMessage )
}
