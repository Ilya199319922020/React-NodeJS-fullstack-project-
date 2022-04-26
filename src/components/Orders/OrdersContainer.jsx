import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Orders from './Orders';
import {
	getOrderDetail, deleteOrderItem, createOrderItem, getOrdersClient
} from '../../redux/ordersReducer';
import { getUsersData } from '../../redux/authReducer';
import { useNavigate, useParams } from 'react-router-dom';

const OrdersContainer = (props) => {
	const navigate = useNavigate();
	const params = useParams();
	const currentId = Number(params.clientId);

	const [orderId, setOrderId] = useState(null);
	const [createOrder, setCreateOrder] = useState(null);
	const [deleteOrderId, setDeleteOrderId] = useState(null);

	useEffect(() => {
		if (!props.isAuth) {
			return navigate("/");
		}
	}, [props.isAuth]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		props.getUsersData(token);
	}, [props.isAuth]);

	useEffect(() => {
		props.getOrdersClient(currentId);
	}, [currentId]);

	useEffect(() => {
		if (orderId) {
			props.getOrderDetail(orderId);
			return navigate(`/orders/${currentId}/${orderId}`);
		} else if (!orderId) {
			props.getOrdersClient(currentId);
		}
	}, [orderId]);

	useEffect(() => {
		if (props.stateOrderId) {
			props.getOrderDetail(props.stateOrderId);
			return navigate(`/orders/${currentId}/${props.stateOrderId}`);
		}
	}, [props.stateOrderId]);

	useEffect(() => {
		if (createOrder) {
			props.createOrderItem(createOrder);
		}
	}, [createOrder]);

	useEffect(() => {
		if (deleteOrderId) {
			props.deleteOrderItem(deleteOrderId)
			props.getOrdersClient(currentId);
			return navigate(`/orders/${currentId}`);
		}
	}, [deleteOrderId])



	return <>
		<Orders
			ordersAll={props.orders}
			setOrderId={setOrderId}
			isOrderDelivery={props.isOrderDelivery}
			deleteOrderItem={deleteOrderItem}
			clientId={props.clientId}
			orderId={orderId}
			setCreateOrder={setCreateOrder}
			setDeleteOrderId={setDeleteOrderId}
		/>
	</>
};

const mapStateToProps = (state) => {
	return {
		orders: state.orders.listOrders,
		isOrderDelivery: state.orders.isOrderDelivery,
		clientId: state.auth.clientId,
		isAuth: state.auth.isAuth,
		stateOrderId: state.orders.stateOrderId,
	}
};

export default connect(mapStateToProps, { getOrdersClient, getOrderDetail, getUsersData, createOrderItem, deleteOrderItem })(OrdersContainer);

