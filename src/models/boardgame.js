const mongoose = require('mongoose')
//TODO flesh out scheme, there is a lot that could be added but want to keep it simple
const boardgameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image_url: String, 
    expansions: [String]
})

/*
boardgameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
*/
module.exports = mongoose.model('Boardgame', boardgameSchema)