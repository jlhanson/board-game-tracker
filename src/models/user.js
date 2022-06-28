const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// hashing passwords taken from: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
const userSchema = new mongoose.Schema({
	username: { type: String, requried: true, index: { unique: true }, trim: true },
	password: { type: String, required: true },
	fullName: { type: String, trim: true },
	email: { type: String, unique: true, trim: true },
	userCollection: [{
		boardgame: { type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame', unique: true },
		plays: Number,
		wins: Number,
		rating: Number,
		active: Boolean
	}],
	wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Boardgame' }],
	account_date: { type: Date, default: Date.now }
})

userSchema.pre('save', function(next) {
	const user = this
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next()

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err)

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err)

			// override the cleartext password with the hashed one
			user.password = hash
			next()
		})
	})
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err)
		cb(null, isMatch)
	})
}

userSchema.methods.validatePassword = async function validatePassword(data) {
	return bcrypt.compare(data, this.password)
}

module.exports = mongoose.model('User', userSchema)