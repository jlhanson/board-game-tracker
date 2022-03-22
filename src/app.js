const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const boardgameRouter = require('./routes/boardgames')
const userRouter = require('./routes/users')
const userCollectionRouter = require('./routes/userCollections')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

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
app.use(morgan('tiny'))
app.use(middleware.requestLogger)

app.use('/api/boardgames', boardgameRouter)
app.use('/api/user', userRouter)
app.use('/api/collection', userCollectionRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app