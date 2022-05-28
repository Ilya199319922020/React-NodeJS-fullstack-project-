const express = require('express');
const router = express.Router();
const orders = require('../models/orders')
const User = require('../models/User');
const mapUsers = require('../mappers/users');
const mapOrder = require('../mappers/order');

router.get('/user/:id', async (req, res) => {
	try {
		const user = await User.find({ id: req.params.id });
		res.status(200).json(user.map(mapUsers));
	} catch (error) {
		res.status(500).json(console.log(error), 'Что-то не так')
	}
});
router.post('/create', async (req, res) => {
	try {
		const order = await orders.create({
			id: req.body.id,
			client_id: req.body.client_id,
			packageName: req.body.packageName,
			packageCalories: req.body.packageCalories,
			deliveries: req.body.deliveries,
		});
		res.status(201).json(order)
	} catch (error) {
		res.status(403).json(console.log(error), 'Что-то не так')
	}
});

router.get('/client/:id', async (req, res) => {
	try {
		const order = await orders.find({ client_id: req.params.id });
		res.status(200).json(order.map(mapOrder));
	} catch (error) {
		res.status(500).json(console.log(error), 'Что-то не так')
	}
});

router.get('/orderDetail/:id', async (req, res) => {
	try {
		const order = await orders.find({ _id: req.params.id });
		res.status(200).json(order.map(mapOrder));
	} catch (error) {
		res.status(500).json(console.log(error), 'Что-то не так')
	}
});


router.delete('/client/:id', async (req, res) => {
	try {
		await orders.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: 'Заказ удалён' });
	} catch (error) {
		res.status(500).json(console.log(error), 'Что-то не так')
	}
});

module.exports = router;