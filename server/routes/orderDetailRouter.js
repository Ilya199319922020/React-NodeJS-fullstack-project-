
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const orders = require('../models/orders')

router.get('/');

// router.post('/', async (req, res) => {
// 	const orders = await Orders.create({
// 		id: req.body.id,
// 	});
// 	res.json(orders);
// });
module.exports = router;