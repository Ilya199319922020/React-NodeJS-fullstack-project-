import { useEffect, useState } from 'react';
import { convertDate, diff, findMinIdx } from '../../../lib/auxiliaryCalculations';
import OrderDetail from '../OrderDetail/OrderDetail';
import ProgressBarOrder from '../ProgressBarOrder/ProgressBarOrder';
import OrderDelivery from './OrderDelivery';
import s from './OrderHeaderInfo.module.css';

const OrderHeaderInfo = (props) => {

  const { dateDelivery, currentDate,
    date, deliveries, isOrderDelivery, order } = props;

  const minIdx = findMinIdx(dateDelivery, currentDate);
  const maxIdx = dateDelivery.length - 1;

  const [dateNextDate, setNextOrders] = useState(minIdx < 0 ? date : dateDelivery[minIdx]);
  const [dateLastOrders, setDateLastOrders] = useState(dateDelivery[maxIdx]);

  useEffect(() => {
    setNextOrders(minIdx < 0 ? date : dateDelivery[minIdx]);
  }, [minIdx]);

  const diffDate = diff(dateLastOrders, dateNextDate) <= 0 ? 0 : diff(dateLastOrders, dateNextDate);

  const onOrderCurrent = (e) => {
    props.setOrderId(e.currentTarget.getAttribute('value'))
  };

  return (
    <div
      className={
        !isOrderDelivery
          ? s.headerInfo__active
          : s.headerInfo
      }
      value={props.valueId}
      onClick={(value) => { onOrderCurrent(value) }}
    >
      <div className={s.headerInfo__item}>
        <div className={s.headerInfo__order}>
          <div>
            <span className={s.headerInfo__orderDay}>
              {
                diff(dateNextDate, date)
              } дней
            </span>
          </div>
          <div className={s.headerInfo__package}>
            <div className={s.headerInfo__packageName}>
              {props.packageName}
            </div>
            <div className={s.headerInfo__packageCalories} >
              {props.packageCalories}
            </div>
          </div>
        </div>
        <div >
          <div className={s.headerInfo__progressBar}>
            <ProgressBarOrder
              value={props.value}
              dateDelivery={dateDelivery}
              minIdx={minIdx}
              maxIdx={maxIdx}
              isOrderDelivery={isOrderDelivery}
            />
          </div>
          <div className={s.headerInfo__dateDelivery}>
            <span className={s.dateDeliveryNext}>
              {
                convertDate(props.currentDate)
              }
            </span>
            <span className={s.diffDate}> oсталось дней:    {diffDate <= 0 ? 'доставлено' : diffDate}
            </span>
            <span className={s.dateNextDate}>
              {
                convertDate(new Date(dateNextDate))
              }
            </span>
          </div>
        </div>
      </div>

      {
        isOrderDelivery && <OrderDelivery
          minIdx={minIdx}
          deliveries={deliveries}
          dateNextDate={dateNextDate}
        />
      }
      {
        !isOrderDelivery && <OrderDetail
          minIdx={minIdx}
          deliveries={deliveries}
          idDb={order._id}
          deleteOrderItem={props.deleteOrderItem}
          order={order}
          setCreateOrder={props.setCreateOrder}
          setDeleteOrderId={props.setDeleteOrderId}
        />
      }
    </div>
  );
};

export default OrderHeaderInfo;