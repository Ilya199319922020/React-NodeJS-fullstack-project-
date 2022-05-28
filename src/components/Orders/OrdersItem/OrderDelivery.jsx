import s from './OrderDelivery.module.css';

const OrderDelivery = (props) => {
  const { dateNextDate, deliveries, minIdx } = props;

  const adressDelivery = deliveries.map(k => k.address);
  const intervalDelivery = deliveries.map(k => k.interval);

  const convertDate = (date) => date
    .toLocaleDateString("ru", { weekday: "long", day: "numeric", month: "short", })
    .replace(/[\s,. ]+/g, " ");

  const nextDate = convertDate(new Date(dateNextDate)).split(' ');

  return (
    <div className={s.orderDelivery}>
      <div className={s.date}>
        <div className={s.nextDateWeekday}>
          <span className={s.dateWeekday}>{nextDate[2]}</span>
          <span className={s.dateDay}>{nextDate[1]}</span>
        </div>
        <div className={s.dateDelivery}>
          Ближайшая доставка
          <span className={s.nextDateMonth}>
            в {nextDate[0]} -
          </span>
          <div className={s.intervalDelivery}>
            {intervalDelivery[minIdx]}
          </div>
          <div className={s.adressDelivery}>
            Работа на объекте {adressDelivery[minIdx]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDelivery;   