const express = require('express');
const Session = require('../models/Session');
const router = express.Router();

router.get('/', async function (req, res, next) {

	const headerData = req.headers['authorization'];

	if (!headerData) return next();

	const token = headerData.split(' ')[1];
	if (!token) return next();

	const session = await Session.findOne({ token }).populate('user');
	if (!session) {
		res.status(401).json('Неверный аутентификационный токен');
	}

	session.lastVisit = new Date();

	await session.save();
	res.status(200).send(session.user);
});

module.exports = router;


