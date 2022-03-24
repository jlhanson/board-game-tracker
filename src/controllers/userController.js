const User = require('../models/user')

// Display all users
exports.user_list = function(req, res) {
	User.find({}).then(users => {
		res.json(users)
	})
}

// Display single user
exports.user_detail = function(req, res, next) {
	User.findById(req.params.id)
		.then(user => {
			if(user) {
				res.json(user)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
}

// Handle user create on POST
exports.user_create = function(req, res, next) {
	const body = req.body

	const user = new User({
		username: body.username,
		password: body.password,
		fullName: body.fullName,
		email: body.email
	})

	user.save()
		.then(savedUser => {
			res.status(201).json(savedUser)
		})
		.catch(error => next(error))
}

// Handle user delete on DELETE
exports.user_delete = function(req, res, next) {
	User.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
}

// Handle user update on PUT
exports.user_replace = function (req, res, next) {
	const { username, password, fullName, email,
		userCollection, wishlist } = req.body


	User.findByIdAndUpdate(req.params.id,
		{ username, password, fullName, email,
			userCollection, wishlist },
		{ new: true, runValidators: true, context: 'query' })
		.then(updatedUser => {
			res.json(updatedUser)
		})
		.catch(error => next(error))
}

// Handle user update on PATCH
exports.user_update = function (req, res, next) {
	const { password, fullName, email,
		userCollection, wishlist } = req.body


	User.findByIdAndUpdate(req.params.id,
		{ password, fullName, email,
			userCollection, wishlist },
		{ new: true, runValidators: true, context: 'query' })
		.then(updatedUser => {
			res.json(updatedUser)
		})
		.catch(error => next(error))
}