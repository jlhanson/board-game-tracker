const mongoose = require('mongoose')
//TODO flesh out scheme, there is a lot that could be added but want to keep it simple
const boardgameSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 2,
		required: true,
		unique: true
	},
	image_url: String,
	expansions: [String],
	tags: [String],
})

module.exports = mongoose.model('Boardgame', boardgameSchema)