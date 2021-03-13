require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const validateBearerToken = require('./vaildate-bearer-token')
const errorHandler = require('./error-handler')
const noteRouter = require('./notes/note-router')
const folderRouter = require('./folders/folder-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())
//app.use(validateBearerToken)

app.use('/api/notes', noteRouter)
app.use('/api/folders', folderRouter)

app.get('/', (req, res) =>{
  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app