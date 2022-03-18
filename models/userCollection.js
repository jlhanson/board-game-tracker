const mongoose = require('mongoose')

const userCollectionSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    owned: {
        name: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame' },
        plays: { type: Number },
        wins: { type: Number },
        rating: { type: Number }
    },
    wishlist: [String]
})

module.exports = mongoose.model('User_Collection', userCollectionSchema)