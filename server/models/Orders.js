const mongoose = require('mongoose');
const connection = require('../libs/connection');

const deliveriesSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	interval: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
});

const ordersSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	client_id: {
		type: Number,
		required: true,
	},
	packageName: {
		type: String,
		required: true,
	},
	packageCalories: {
		type: String,
		required: true,
	},

	deliveries: [deliveriesSchema],
});

module.exports = connection.model('orders', ordersSchema);