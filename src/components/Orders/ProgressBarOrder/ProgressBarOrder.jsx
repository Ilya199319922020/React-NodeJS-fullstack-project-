import { useEffect, useState } from 'react';
import s from './ProgressBarOrder.module.css'

const ProgressBarOrder = (props) => {
	const { dateDelivery, minIdx, maxIdx } = props;
	const valueDelivery = (dateDelivery.length - 1) - minIdx <= 0
		? dateDelivery.length
		: (dateDelivery.length - 1) - minIdx;

	const [max, setMax] = useState(dateDelivery.length);
	const [value, setValue] = useState(valueDelivery);

	useEffect(() => {
		setMax(dateDelivery.length)
	}, [dateDelivery.length]);

	useEffect(() => {
		setValue(valueDelivery)
	}, [valueDelivery]);

	return (
		<progress
			className={
				!props.isOrderDelivery
					? s.progress__active
					: s.progress
			}
			value={value}
			max={max}
		/>
	);
};

export default ProgressBarOrder;
