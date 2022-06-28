/* eslint-disable indent */
const User = require('../models/user')

// TODO: Implement getting of collection detail
// TODO: Implement deletion of user collection entries
// TODO: Implement creation/add of user collection
// TODO: Implement update/patch of user collection

// Display all users
exports.user_list = function (req, res) {
    User.find({}).then((users) => {
        res.json(users)
    })
}

// Display single user
exports.user_detail = function (req, res, next) {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => next(error))
}

// Handle user create on POST
exports.user_create = function (req, res, next) {
    const { username, password, fullName, email } = req.body

    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: 'Password must be longer than 5 characters' })
    }
    try {
        const user = new User({
            username: username,
            password: password,
            fullName: fullName,
            email: email,
        })

        user.save()
            .then((savedUser) => {
                res.status(201).json(savedUser)
            })
            .catch((error) => next(error))
    } catch (err) {
        res.status(401).json({
            message: 'User not successfully created',
            error: err.message,
        })
    }
}

// Handle user delete on DELETE
exports.user_delete = function (req, res, next) {
    User.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch((error) => next(error))
}

// Handle user update on PUT
exports.user_replace = function (req, res, next) {
    const { username, password, fullName, email, userCollection, wishlist } =
        req.body

    User.findByIdAndUpdate(
        req.params.id,
        { username, password, fullName, email, userCollection, wishlist },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((replacedUser) => {
            res.json(replacedUser)
        })
        .catch((error) => next(error))
}

// Handle user update on PATCH
exports.user_update = function (req, res, next) {
    const { password, fullName, email } = req.body

    User.findByIdAndUpdate(
        req.params.id,
        { password, fullName, email },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((updatedUser) => {
            res.json(updatedUser)
        })
        .catch((error) => next(error))
}

// Handle user collection update on PATCH
exports.user_collection_update = function (req, res, next) {
    const { userCollection } = req.body

    User.findById(req.params.id).exec(function (err, doc) {
        for (var i = 0; i < doc.userCollection.length; i++) {
            console.log(doc.userCollection[i].boardgame.toString)
            if (
                doc.userCollection[i].boardgame.toString() ===
                userCollection.boardgame
            ) {
                doc.userCollection[i] = userCollection
                User.findByIdAndUpdate(req.params.id, doc, {
                    new: true,
                    runValidators: true,
                    context: 'query',
                })
                    .then((updatedUser) => {
                        res.json(updatedUser)
                    })
                    .catch((error) => next(error))
            }
        }
    })
}

// Handle user login
exports.user_login = function (req, res, next) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            message: 'Please enter username and password',
            error: 'Username or password field empty',
        })
    }
    /*
    const userExists = User.find((person) => person.username === username)
		if (!userExists) return res.status(401).json({
			message: 'Username not found'
		})

    userExists.comparePassword(password, function (err, isMatch) {
        if (err) {
            console.log('err')
        } else if (isMatch) {
            console.log('ayy it workds')
        }
    })

    if (pwMatch) {
        res.json({ success: `User ${username} is logged in!` })
    } else {
        res.sendStatus(401)
    }
		*/

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: 'Login not successful, user not found',
                })
            } else {
                user.comparePassword(password, function (err, isMatch) {
                    console.log(isMatch)
                    console.log(password)
                    if (!isMatch) {
                        res.status(401).json({
                            message: 'Login not successful, password incorrect',
                        })
                    }
                    if (isMatch) {
                        res.status(200).json({
                            message: 'Login successful',
                            user,
                        })
                    }
                })
            }
        })
        .catch((error) => next(error))
}
