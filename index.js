const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const models = require('./models')
const Boardgame = models.boardgame
const User = models.user
const UserCollection = models.userCollection

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/boardgames', (request, response) => {
    Boardgame.find({}).then(boardgames => {
        response.json(boardgames)
    })
})

app.get('/api/boardgames/:name', (request, response) => {
    const name = request.params.name
    Boardgame.find({ "name": name }).then(boardgames => {
        response.json(boardgames)
    })
})

app.post('/api/boardgames', (request, response) => {
    const body = request.body
    console.log(body)

    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const boardgame = new Boardgame({
        name: body.name,
        image_url: body.image_url || "",
        expansions: body.expansions || []
    })

    boardgame.save().then(savedBoardgame => {
        response.json(savedBoardgame)
    })
    .catch(error => {
        console.log('Boardgame already exists! Error: \n', error)
        response.status(500).end()
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})