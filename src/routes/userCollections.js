const express = require('express')
const router = express.Router()

// Require controller module
const userCollection_controller = require('../controllers/userCollectionController.js')

// POST request for creating userCollection
router.post('/', userCollection_controller.userCollection_create)

// DELETE request for deleting userCollection
router.delete('/:id', userCollection_controller.userCollection_delete)

// PUT request for updating userCollection
router.put('/:id', userCollection_controller.userCollection_update)

// GET request for one userCollection
router.get('/:id', userCollection_controller.userCollection_detail)

// GET request for all userColelctions
router.get('/', userCollection_controller.userCollection_list)

module.exports = router