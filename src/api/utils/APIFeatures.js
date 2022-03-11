module.exports = class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	// FILTERING
	filter() {
		const queryObj = { ...this.queryString };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach((el) => delete queryObj[el]);
		//1b) ADVANCED FILTERING
		const queryStr = JSON.stringify(queryObj).replace(
			/\b(gte?|lte?)\b/g,
			(match) => `$${match}`
		);
		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}
	// SORTING
	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}
		return this;
	}
	// FIELDS BASED SELECTION
	select() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');
		}
		return this;
	}
	// PAGINATION
	pagination() {
		const limit = parseInt(this.queryString.limit) || 30;
		const page = parseInt(this.queryString.page) || 1;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
};
