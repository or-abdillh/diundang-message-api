'use strict'

require('dotenv').config({ path: `${ process.cwd() }/.env` })

const { Sequelize, DataTypes } = require('sequelize')
const models = [ require('./models/invite.js'), require('./models/message.js') ]

const env = process.env.NODE_ENV || 'dev'

const dialectOptions = env === 'dev' ? {  } : {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

// Init new Sequelize
const sequelize = new Sequelize( process.env.DATABASE_URL, {
  dialect: 'postgress',
  dialectOptions
})

// Define Models
for ( const model of models ) model(sequelize, DataTypes)

// Parse Models
const { invite, message } = sequelize.models

// Define ascociate
invite.hasMany( message, { foreignKey: 'id', as: 'invite_id' } )
message.belongsTo( invite, { foreignKey: 'invite_id' } )

module.exports = sequelize
