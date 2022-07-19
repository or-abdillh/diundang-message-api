'use strict'

// Controllers
const UserController = require('../controllers/UserController.js')

module.exports = app => {

  // Dashboard
  app.route('/').get( UserController.index )

}
