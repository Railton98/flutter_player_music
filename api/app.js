const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bandRouter = require('./routes/bands')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/player')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/bands', bandRouter)

module.exports = app
