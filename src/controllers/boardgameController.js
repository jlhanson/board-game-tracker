const Boardgame = require('../models/boardgame')

// Display all boardgame titles
exports.boardgame_list = function(req, res) {
	Boardgame.find({}).then(boardgames => {
		res.json(boardgames)
	})
}

// Display one boardgame title
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
exports.boardgame_create = function(req, res, next) {
	const body = req.body

	const boardgame = new Boardgame({
		name: body.name,
		image_url: body.image_url,
		expansions: body.expansions,
		tags: body.tags
	})

	boardgame.save()
		.then(savedBoardgame => {
			res.status(201).json(savedBoardgame)
		})
		.catch(error => next(error))
}

// Handle boardgame delete on DELETE
exports.boardgame_delete = function(req, res, next) {
	Boardgame.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
}

// Handle boardgame update on PUT
exports.boardgame_replace = function(req, res, next) {
	const { name, image_url, expansions, tags } = req.body

	Boardgame.findByIdAndUpdate(req.params.id,
		{ name, image_url, expansions, tags },
		{ new: true, runValidators: true, context: 'query' })
		.then(updatedBoardgame => {
			res.json(updatedBoardgame)
		})
		.catch(error => next(error))
}

// Handle boardgame update on PATCH
exports.boardgame_update = function(req, res, next) {
	const { image_url, expansions, tags } = req.body

	Boardgame.findByIdAndUpdate(req.params.id,
		{ image_url, expansions, tags },
		{ new: true, runValidators: true, context: 'query' })
		.then(updatedBoardgame => {
			res.json(updatedBoardgame)
		})
		.catch(error => next(error))
}

