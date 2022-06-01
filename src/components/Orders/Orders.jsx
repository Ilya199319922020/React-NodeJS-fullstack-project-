import s from './Orders.module.css';
import React from 'react';
import OrderHeaderInfo from './OrdersItem/OrderHeaderInfo';
import { NavLink } from 'react-router-dom';

const Orders = (props) => {

  const { ordersAll, isOrderDelivery } = props;

  const date = "2021-02-01";
  const currentDate = new Date(date);

  const onOrderId = () => {
    props.setOrderId(null);
  };

  const ordersElements = ordersAll
    .map(o =>
      <OrderHeaderInfo
        date={date}
        deliveries={o.deliveries}
        dateDelivery={o.deliveries.map(d => d.date)}
        key={o._id}
        packageName={o.packageName}
        packageCalories={o.packageCalories}
        currentDate={currentDate}
        isOrderDelivery={isOrderDelivery}
        valueId={o._id}
        order={o}
        orderId={props.orderId}
        deleteOrderItem={props.deleteOrderItem}
        setOrderId={props.setOrderId}
        setCreateOrder={props.setCreateOrder}
        setDeleteOrderId={props.setDeleteOrderId}
      />
    );


  return <div className={s.orders}>
    <div>
      <div>
        <div >
          {isOrderDelivery
            ? <b className={s.ordersBtn__text}>
              Мои заказы
              <span className={s.ordersBtn__count}>
                {ordersAll.length}
              </span>
            </b>
            : <NavLink onClick={onOrderId} to={`/orders/${props.clientId}`}>
              <b className={s.ordersBtn__back} >
                Назад
              </b>
            </NavLink>}
        </div>
        <NavLink to={`/orders/${props.clientId}/${props.orderId}`} >
          <div className={s.ordersList} >
            {ordersElements}
          </div>
        </NavLink>
      </div>
    </div>
  </div >
}

export default Orders;