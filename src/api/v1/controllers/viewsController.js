const Booking = require('../models/Booking');
const Staff = require('../models/Staff');
const Hall = require('../models/Hall');
const APIFeatures = require('../../utils/APIFeatures');
const ObjectId = require('mongoose').Types.ObjectId;
exports.getHome = (req, res, next) => {
	try {
		res.status(200).render('admin', {
			title: 'Welcome',
		});
	} catch (error) {
		res.status(500).render('error', {
			title: 'Server Error',
			message: 'Seems like something went wrong',
		});
	}
};

exports.getBookings = async (req, res, next) => {
	try {
		// GET ALL BOOKINGS DATA FROM COLLECTION
		const features = new APIFeatures(Booking.find(), req.query)
			.filter()
			.sort()
			.select()
			.pagination();
		const bookings = await features.query;
		// BUILD TEMPLATE
		// RENDER TEMPLATE
		res.status(200).render('bookings', {
			title: 'Bookings',
			bookings: bookings,
			heading: 'All Reservations',
		});
	} catch (error) {
		res.status(500).render('error', {
			title: 'Server Error',
			message: 'Seems like something went wrong',
		});
	}
};
exports.getBookingsTable = async (req, res, next) => {
	try {
		// GET ALL BOOKINGS DATA FROM COLLECTION
		const features = new APIFeatures(Booking.find(), {
			sort: 'bookedFrom',
		}).sort();
		const bookings = await features.query;
		// BUILD TEMPLATE

		// RENDER TEMPLATE
		res.status(200).render('bookingsTable', {
			title: 'Bookings Table',
			bookings: bookings,
			heading: 'Bookings Table',
		});
	} catch (error) {
		res.status(500).render('error', {
			title: 'Server Error',
			message: 'Seems like something went wrong',
		});
	}
};

exports.getSingleBooking = async (req, res, next) => {
	try {
		const { id } = req.params;
		const booking = await Booking.aggregate([
			{
				$match: {
					_id: ObjectId(id),
				},
			},
			{
				$addFields: {
					bookedFrom: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$bookedFrom',
						},
					},
					bookedTo: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$bookedTo',
						},
					},
				},
			},
		]);
		res.status(200).render('editBook', {
			title: `${booking[0].clientName}'s Reservation`,
			booking: booking[0],
		});
	} catch (error) {
		return res.redirect('/bookings');
	}
};

exports.getHalls = async (req, res, next) => {
	try {
		const halls = await Hall.find();
		res.status(200).render('halls', {
			title: 'Halls',
			heading: 'All Halls',
			halls,
		});
	} catch (error) {
		res.status(404).render('error', {
			title: 'Not Found',
			message: 'Seems like something went wrong',
		});
	}
};

exports.getStaffs = async (req, res, next) => {
	try {
		const staffs = await Staff.find();
		res.status(200).render('staffs', {
			title: 'Staff Managment',
			heading: 'Staff Management',
			staffs,
		});
	} catch (error) {
		res.status(404).render('error', {
			title: 'Not Found',
			message: 'Seems like something went wrong',
		});
	}
};
exports.getLogin = (req, res, next) => {
	try {
		res.status(200).render('login', {
			title: 'Login',
		});
	} catch (error) {
		res.status(404).render('error', {
			title: 'Not Found',
			message: 'Seems like something went wrong',
		});
	}
};

exports.getRegister = (req, res, next) => {
	try {
		res.status(200).render('register', {
			title: 'Sign up',
		});
	} catch (error) {
		res.status(404).render('error', {
			title: 'Not Found',
			message: 'Seems like something went wrong',
		});
	}
};

exports.getBookingPortal = (req, res, next) => {
	try {
		res.status(200).render('book', {
			title: 'Create Booking',
		});
	} catch (error) {
		res.status(404).render('error', {
			title: 'Not Found',
			message: 'Seems like something went wrong',
		});
	}
};

exports.getCalender = (req, res, next) => {
	try {
		res.status(200).render('calender', {
			title: 'Calender',
		});
	} catch (error) {
		res.status(404).render('error', {
			title: 'Not Found',
			message: 'Seems like something went wrong',
		});
	}
};

exports.getBin = (req, res, next) => {
	try {
		res.status(200).render('bin', {
			title: 'Bin',
		});
	} catch (error) {
		res.status(404).render('error', {
			title: 'Not Found',
			message: 'Seems like something went wrong',
		});
	}
};

// exports.getEmail = (req, res, next) => {
// 	try {
// 		res.status(200).render('emails/welcome', {
// 			firstname: 'Hemense',
// 		});
// 	} catch (error) {}
// };
