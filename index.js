'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3000
const database = require('./src/database')

// Setup
const app = express()
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )
app.use( cors() )
app.set( 'view engine', 'ejs' )

// Database connection
const dbPrepareConnection = async () => {
  try {
    console.log('Prepare connection ...')
    await database.authenticate()
    console.log('Database connected !!')
  } catch( err ) {
    console.log('Failed to connect database !!')
    console.log(err)
    process.exit(1)
  }
}

// Init 
const Init = async () => {
  await dbPrepareConnection()

  // App listen
  app.listen(PORT, err => {
    if ( err ) throw err
    console.log('Application running on port ' + PORT)
  })
}

Init()
