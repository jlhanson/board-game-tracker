const Boardgame = require('../models/boardgame')
const { response } = require('express')

// display all boardgame titles
exports.boardgame_list = function(req, res) {
       Boardgame.find({}).then(boardgames => {
        res.json(boardgames)
    }) 
}

// display one boardgame title
exports.boardgame_detail = function(req, res, next) {
    Boardgame.findById(req.params.id)
        .then(boardgame => {
            if (boardgame) {
                res.json(boardgame)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
}

// Handle boardgame creation on POST
exports.boardgame_create = function(req, res) {
    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({ error: 'name missing' })
    }

    const boardgame = new Boardgame({
        name: body.name,
        image_url: body.image_url || "",
        expansions: body.expansions || []
    })

    boardgame.save().then(savedBoardgame => {
        res.status(201).json(savedBoardgame)
    })
    .catch(error => {
        console.log('Boardgame already exists! Error: \n', error)
        res.status(500).end()
    })
}

// Handle boardgame delete on DELETE
exports.boardgame_delete = function(req, res, next) {
    Boardgame.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
}

// Handle boardgame update on PUT
exports.boardgame_update = function(req, res, next) {
    const body = req.body

    const boardgame = {
        name: body.name,
        image_url: body.image_url,
        expansions: body.expansions
    }

    Boardgame.findByIdAndUpdate(req.params.id, boardgame, { new: true })
        .then(updatedBoardgame => {
            res.json(updatedBoardgame)
        })
        .catch(error => next(error))
}