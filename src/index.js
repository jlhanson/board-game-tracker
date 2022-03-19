require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
morgan('tiny')
const { response } = require('express')
const mongoose = require('mongoose')
const url = process.env.MONGO_PROD_URI

const app = express()
app.use(express.json())
app.use(cors())

const boardgameRouter = require('./routes/boardgames')
app.use('/api/boardgames', boardgameRouter)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })


app.get('/api/users', (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})

app.post('/api/users', (request, resposne) => {
    const body2 = request.body

    if (body2.username === undefined || body2.password === undefined) {
        return response.status(400).json({ error: 'username or password missing' })
    }

})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
