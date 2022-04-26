import * as axios from 'axios';

const intance = axios.create({
	withCredentials: true,
	baseURL: 'http://127.0.0.1:5000/api',
});


export const AuthApi = {

	login(login, password) {
		return intance.post('/login', { login, password })
	},

	getHeader(token) {
		return intance.get('/me', {
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		},
		)
	},
};

export const OrdersApi = {

	getOrders() {
		return intance.get('/orders').then(response => {
			return response;
		});
	},
	getOrdersUser(clientId) {
		return intance.get(`/orders/client/${clientId}`);
	},
	getOrderItem(orderId) {
		return intance.get(`/orders/orderDetail/${orderId}`);
	},
	createOrder(copyOrder) {
		return intance.post(`/orders/create`, copyOrder);
	},
	deleteOrder(currentId) {
		return intance.delete(`/orders/client/${currentId}`)
	},

};