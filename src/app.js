const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const boardgameRouter = require('./routes/boardgames')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')
morgan('tiny')

//logger.info('connecting to', config.MONGO_PROD_URI)

mongoose.connect(config.MONGO_PROD_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB: ', error. message)
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/boardgames', boardgameRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app