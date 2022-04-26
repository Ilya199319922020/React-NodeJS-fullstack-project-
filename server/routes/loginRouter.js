const { v4: uuid } = require('uuid');
const express = require('express');
const router = express.Router();
const passport = require('../libs/passportLocal');
const User = require('../models/User');

router.post('login', async function (req, res, next) {

	await passport.authenticate('local', async (err, user, info) => {
		if (err) throw err;

		if (!user) {
			res.status(400);
			res.body = { error: info };
			return;
		}
		res.status(200);
		res.body = ({ message: 'Всё ок' })
		
	})(req, res, next);
});


// router.post('/', async (req, res, next) => {  // Использовал  такое создание модели для генерации пароля

// 	const user = new User({
// 		id: req.body.id,
// 		login: req.body.login,
// 	});
// 	await user.setPassword(req.body.password);
// 	await user.save();
// 	res.json(user);
// });
// router.post('/', async (req, res, next) => {  // Использовал  такое создание модели для генерации пароля

// 	const user = await User.findOne({
// 		login: req.body.login,
// 	});

// 	res.json(user);
// });

module.exports = router;