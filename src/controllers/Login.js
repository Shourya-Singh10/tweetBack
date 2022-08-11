const loginRouter = require('express').Router()
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')

/** 
 * Verification
*/
loginRouter.post('/verify', async (req, res, next) => {
	const {
		username,
		email,
		phone
	} = req.body
	try {
		let user

		user = await User.findOne({
			username: username
		})
		if (user) return res.json({ data: username })
		user = await User.findOne({
			email: email
		})
		if (user) return res.json({ data: email })
		user = await User.findOne({
			phone: phone
		})
		if (user) return res.json({ data: phone })
		res.json(false)

	} catch (error) {
		next(error)
	}
})

/**
 * Login
 */
loginRouter.post('/', async (req, res, next) => {
	const {
		// username,
		// email,
		// phone,
		password,
		loginid,
	} = req.body
	try {
		let user
		const dpwd = `${password}###`

		console.log('REQUEST BODY LOGIN - ', req.body)

		// if (username !== '') {
		// 	user = await User.findOne({
		// 		username: username
		// 	})
		// } else 
		if (loginid !== '') {
			user = await User.findOne({
				email: loginid
			})
		} 
		// else if (phone !== '') {
		// 	user = await User.findOne({
		// 		phone: phone
		// 	})
		// }
		console.log('USERRRRRRRRRRRRRRRRRRRRR - ', user)
		const passwordCorrect = (user === null)
			? false
			// : await bcrypt.compare(password, user.password)
			: dpwd === user.password

		if (!(user && passwordCorrect)) {
			res.status(401).json({ ErrorLogin: 'Invalid user or password' })
		} else {
			res.json(user)
		}
	} catch (error) {
		next(error)
	}

})

/**
 * Register
 */
loginRouter.post('/register', async (req, res, next) => {
	const {
		first_name,
		last_name,
		email,
		contact,
		password,
		loginid,
	} = req.body

	try {
		const SALT_ROUNDS = 10
		// const passwordHash = await bcrypt.hash(user_password, SALT_ROUNDS)
		const passwordHash = `${password}###`

		let newUser = new User({
			user_photo: '',
			image_bg: '',
			name: `${first_name} ${last_name}`,
			username: `@${first_name}`,
			email: email,
			phone: contact,
			password: passwordHash,
			// birthday: user_birthday,
			// loginid: loginid,
			description: '',
			following: [],
			followers: []
		})
		const savedUser = await newUser.save()
		console.log('SAVED USERRRR - ', savedUser)
		res.status(201)
			.json(savedUser)
	} catch (error) {
		next(error)
	}
})

module.exports = loginRouter