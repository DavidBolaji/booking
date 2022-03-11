const mongoose = require('mongoose');
const slugify = require('slugify');
const HallSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'A hall must have a name'],
		unique: true,
		trim: true,
		minlength: [5, 'A tour name must have more than 5 characters'],
		required: true,
	},
	slug: String,
	images: {
		type: [String],
		default: 'No-img-found',
	},
	location: Object,
	ratingsAverage: {
		type: Number,
		default: 1.0,
		min: [1, 'A rating cannot be below 1'],
		max: [5, 'A rating cannot be above 5'],
	},
	ratingsQuantity: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	},
	bookable: {
		type: Boolean,
		default: true,
		select: 0,
	},
});

HallSchema.pre('save', function (next) {
	this.slug = slugify(this.name.toLowerCase());
	next();
});

HallSchema.pre(/^find/, function (next) {
	this.find({ bookable: { $eq: true } });
	this.select('-__v');
	next();
});

const Hall = mongoose.model('Hall', HallSchema);
module.exports = Hall;
