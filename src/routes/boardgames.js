const express = require('express')
const router = express.Router()

// Require controller module
const boardgame_controller = require('../controllers/boardgameController.js')

// POST request for creating boardgame
router.post('/', boardgame_controller.boardgame_create)

// DELETE request for deleting boardgame
router.delete('/:id', boardgame_controller.boardgame_delete)

// PUT request for updating boardgame
router.put('/:id', boardgame_controller.boardgame_update)

// GET request for one boardgame title
router.get('/:id', boardgame_controller.boardgame_detail)

// GET request for all boardgame titles
router.get('/', boardgame_controller.boardgame_list)

module.exports = router