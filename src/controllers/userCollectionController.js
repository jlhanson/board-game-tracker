const UserCollection = require('../models/userCollection')

// Display all boardgames in userCollection
exports.userCollection_list = function(req, res) {
	UserCollection.find({}).then(userCollections => {
		res.json(userCollections)
	})
}

// Display boardgames in one userCollection
exports.userCollection_detail = function(req, res, next) {
	UserCollection.findById(req.params.id)
		.then(userCollection => {
			if (userCollection) {
				res.json(userCollection)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
}

// Handle userCollection creation on POST
exports.userCollection_create = function(req, res, next) {
	const body = req.body

	const userCollection = new UserCollection({
		username: body.username,
		owned: body.owned,
		wishlist: body.wishlist
	})

	userCollection.save()
		.then(savedUserCollection => {
			res.status(201).json(savedUserCollection)
		})
		.catch(error => next(error))
}

// Handle userCollection delete on DELETE
exports.userCollection_delete = function(req, res, next) {
	UserCollection.findByIdAndRemove(req.params.id)
		.then(result => {
			res.send(204).end()
		})
		.catch(error => next(error))
}

// Handle userCollection update on PUT
exports.userCollection_update = function(req, res, next) {
	const { username, name, plays, wins, rating,
		active, wishlist } = req.body

	UserCollection.findByIdAndUpdate(req.params.id,
		{ username, name, plays, wins, rating, active, wishlist },
		{ new: true, runValidators: true, context: 'query' })
		.then(updatedUserCollection => {
			res.json(updatedUserCollection)
		})
		.catch(error => next(error))
}