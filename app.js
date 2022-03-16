const express = require('express')

//Routes
const { usersRouter } = require('./routes/user.routes')

//init server
const app = express()

//import json
app.use(express.json())

//endpoints
app.use('/api/v1/users', usersRouter)

module.exports = { app }