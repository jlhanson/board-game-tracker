const express = require('express')
const router = express.Router()

// Require controller module
const boardgame_controller = require('../controllers/boardgameController.js')

// POST request for creating boardgame
router.post('/title', boardgame_controller.boardgame_create)

// DELETE request for deleting boardgame
router.delete('/title/:id', boardgame_controller.boardgame_delete)

// PUT request for updating boardgame
router.put('/title/:id', boardgame_controller.boardgame_update)

// GET request for one boardgame title
router.get('/title/:id', boardgame_controller.boardgame_detail)

// POST request for all boardgame titles
router.get('/title', boardgame_controller.boardgame_list)

module.exports = router;