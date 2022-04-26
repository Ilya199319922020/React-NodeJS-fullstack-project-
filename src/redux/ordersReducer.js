import { OrdersApi } from "../api/api";

const IS_ORDER_DELIVERY = 'IS_ORDER_DELIVERY';
const SET_ORDERS_CLIENT = 'SET_ORDERS_CLIENT';
const SET_ORDER_ID = 'SET_ORDER_ID';

const initialState = {
	listOrders: [],
	isOrderDelivery: null,
	stateOrderId: null,
};

const ordersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ORDERS_CLIENT:
			{
				return {
					...state,
					listOrders: action.listOrders
				}
			}
		case IS_ORDER_DELIVERY:
			return {
				...state,
				isOrderDelivery: action.isOrderDelivery
			}

		case SET_ORDER_ID:
			return {
				...state,
				stateOrderId: action.stateOrderId
			}

		default:
			return state;
	}
};

const setOrderId = (stateOrderId) => ({
	type: SET_ORDER_ID,
	stateOrderId
});

const setOrdersClient = (listOrders) => ({
	type: SET_ORDERS_CLIENT,
	listOrders: listOrders
});

const setIsOrderDelivery = (isOrderDelivery) => ({
	type: IS_ORDER_DELIVERY,
	isOrderDelivery: isOrderDelivery
});


export const getOrdersClient = (clientId) => async (dispatch) => {
	dispatch(setOrderId(null))
	const response = await OrdersApi.getOrdersUser(clientId);
	if (response.status === 200) {
		const ordersAll = response.data;
		dispatch(setOrdersClient(ordersAll));
		dispatch(setIsOrderDelivery(true));
	}
};
export const getOrderDetail = (orderId) => async (dispatch) => {
	const response = await OrdersApi.getOrderItem(orderId);
	if (response.status === 200) {
		dispatch(setOrdersClient(response.data));
		dispatch(setIsOrderDelivery(false));
	}
};
export const createOrderItem = (copyOrder) => {
	return async (dispatch) => {
		const response = await OrdersApi.createOrder(copyOrder);
		if (response.status === 201) {
			const stateOrderId = response.data._id;
			dispatch(setOrderId(stateOrderId))
		}
	}
};
export const deleteOrderItem = (idDb) => async (dispatch) => {
	const response = await OrdersApi.deleteOrder(idDb);
	if (response.status === 200) {
		dispatch(setIsOrderDelivery(true));
	}
};

export default ordersReducer;
