const User = require('../models/user')

exports.user_list = function(req, res) {
	User.find({}).then(users => {
		res.json(users)
	})
}

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

exports.user_delete = function(req, res, next) {
	User.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
}

exports.user_update = function (req, res, next) {
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