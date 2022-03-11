/**
 *
 * @param {[{start: Date, end: Date}]} dateRanges
 * @returns {object}
 */
function overlappingDates(dateRanges) {
	let sorted = dateRanges.sort((previous, current) => {
		let previousStart = new Date(previous.start).getTime();
		let currentStart = new Date(current.start).getTime();
		if (previousStart < currentStart) return -1;
		if (previousStart === currentStart) return 0;
		return 1;
	});
	let result = sorted.reduce(
		(result, current, idx, arr) => {
			if (idx === 0) {
				return result;
			}
			let previous = arr[idx - 1];
			let previousEnd = previous.end.getTime();
			let currentStart = current.start.getTime();
			let overlap = previousEnd >= currentStart;
			if (overlap) {
				result.overlap = true;
				result.ranges.push({ previous, current });
			}
			return result;
		},
		{ overlap: false, ranges: [] }
	);
	return result;
}

module.exports = overlappingDates;
