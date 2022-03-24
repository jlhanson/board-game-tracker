const express = require('express')
const router = express.Router()

// Require controller module
const user_controller = require('../controllers/userController.js')

// POST request for creating user
router.post('/', user_controller.user_create)

// DELETE request for deleting user
router.delete('/:id', user_controller.user_delete)

// PUT request for updating user
router.put('/:id', user_controller.user_replace)

// PATCH request for updating partial user
router.patch('/:id', user_controller.user_update)

// GET request for one user
router.get('/:id', user_controller.user_detail)

// GET request for all users
router.get('/', user_controller.user_list)

module.exports = router