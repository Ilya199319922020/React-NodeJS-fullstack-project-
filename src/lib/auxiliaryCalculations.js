export const convertDate = (date) => date
	.toLocaleDateString("ru", { day: "numeric", month: "short" })
	.replace(/[\s,. ]+/g, " ");

export const objectWithoutKey = (object, key) => {
	const { [key]: deletedKey, ...otherKeys } = object;
	return otherKeys;
};

export const diff = (a, b) => Math.floor((new Date(a) - new Date(b)) / 8.64e7);

export const findMinIdx = (d, q) => d.slice()
	.map(t => Math.abs(new Date(t).getTime()))
	.findIndex(z => z > Math.abs(q));