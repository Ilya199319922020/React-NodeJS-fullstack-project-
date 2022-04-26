module.exports = function mapOrder(order) {
	return {
		_id: order._id,
		id: order.id,
		client_id: order.client_id,
		packageName: order.packageName,
		packageCalories: order.packageCalories,
		deliveries: order.deliveries,
	};
};