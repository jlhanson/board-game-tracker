const mongoose = require('mongoose')

const userCollectionSchema = new mongoose.Schema({
	username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	owned: [{
		id: { type: mongoose.ObjectId },
		name: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame' },
		gameStats: {
			plays: Number ,
			wins: Number,
		},
		rating: Number,
		active: Boolean
	}],
	wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame' }]
})

module.exports = mongoose.model('User_Collection', userCollectionSchema)