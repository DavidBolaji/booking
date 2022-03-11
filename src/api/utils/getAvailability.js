const dayms = 24 * 60 * 60 * 1000;
function getAvailableDates(dateRange, bookedDates) {
	const timeline = dateRange.map((el) => new Date(el).getTime());
	const calendar = range(timeline[0], timeline[1], dayms);
	const bookingsTimeline = [...bookedDates].map((el) =>
		range(new Date(el[0]).getTime(), new Date(el[1]).getTime(), dayms)
	);
	const bookings = flattenArray(bookingsTimeline);
	const toProcess = splitup(calendar, bookings);
	const filtered = filterer(toProcess, bookings);
	return filtered.map((el) => [
		new Date(el[0]).toISOString(),
		new Date(el[el.length - 1]).toISOString(),
	]);
}

function range(start, end, step = 1) {
	let array = [];
	for (let i = start; i <= end; i += step) {
		array.push(i);
	}
	return array;
}

const splitup = (array, keys) =>
	((set) =>
		array.reduce(
			(output, value) => {
				if (set.has(value)) output.push([value]);
				else output[output.length - 1].push(value);
				return output;
			},
			[[]]
		))(new Set(keys));

function filterer(arrs, filter) {
	let arr = [];
	for (let chr in arrs) {
		arr.push(arrs[chr].filter((el) => filter.indexOf(el) === -1));
	}
	return arr.filter((el) => el.length > 0);
}

function flattenArray(array) {
	return array.reduce((a, b) => a.concat(b));
}

module.exports = getAvailableDates;
