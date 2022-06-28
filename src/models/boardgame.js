const mongoose = require('mongoose')
//TODO flesh out scheme, there is a lot that could be added but want to keep it simple
const boardgameSchema = new mongoose.Schema({
	title: {
		type: String, minLength: 2, required: true,
		unique: true, trim: true },
	image_url: { type: String, trim: true },
	expansions: [{ type: String, trim: true }],
	tags: [{ type: String, trim: true }],
})

module.exports = mongoose.model('Boardgame', boardgameSchema)