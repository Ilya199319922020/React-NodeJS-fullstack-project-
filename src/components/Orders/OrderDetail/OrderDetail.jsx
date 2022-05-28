import s from './OrderDetail.module.css';
import React from 'react';
import { objectWithoutKey } from '../../../lib/auxiliaryCalculations';
import iconPouch from '../../../assets/Vector.png'

const OrderDetail = (props) => {
  const { headerInfo, minIdx, deliveries, idDb, order } = props;

  const convertDate = (date) => date
    .toLocaleDateString("ru", { day: "numeric", month: "long", weekday: "long", })
    .replace(/[, ]+/g, " ");

  const intervalDelivery = deliveries
    .slice(minIdx)
    .map(i => <DataDelivery
      interval={i.interval} date={i.date}
      key={i._id} convertDate={convertDate} />);

  const orderCreate = objectWithoutKey(order, '_id');

  const activeOrder = () => {
    props.setCreateOrder(orderCreate)
  };

  const orderDelete = () => {
    props.setDeleteOrderId(idDb)
  };

  return (
    <div className={s.orderDetail}>
      <div className={s.orderDetail__wraper}>
        <div>
          {headerInfo}
        </div>
        <div>
          <b className={s.orderDetail__text}>Доставки</b>
          <div>
            {intervalDelivery}
          </div>
          <div>
            <div className={s.orderDetail__btn}>
              <button onClick={activeOrder} className={s.orderDetail__btnCreate}>
                <span className={s.orderDetail__btnCreateText}>
                  Дублировать заказ
                </span>
              </button>
              <button onClick={orderDelete} className={s.orderDetail__btnDelete}>
                <span className={s.orderDetail__btnDeleteText}>
                  Отменить заказ
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataDelivery = (props) => {
  return (
    <div className={s.orderDetail__dataDelivery}>
      <div>
        <img className={s.orderDetail__icon} src={iconPouch} />
      </div>
      <div className={s.orderDetail__convertDateList}>
        {
          props.convertDate((new Date(props.date)))
        }
      </div>
      <div className={s.orderDetail__interval}>
        {props.interval}
      </div>
    </div>
  );
};

export default OrderDetail;