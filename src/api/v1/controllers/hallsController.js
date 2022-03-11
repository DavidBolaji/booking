const Hall = require('../models/Hall');
const responseHandler = require('../../utils/responseHandler');
const CustomError = require('../../utils/CustomError');
const APIFeatures = require('../../utils/APIFeatures');

exports.getAllHalls = async (req, res, next) => {
	try {
		const features = new APIFeatures(Hall.find(), req.query)
			.filter()
			.sort()
			.select()
			.pagination();

		const halls = await features.query;
		// SEND RESPONSE
		return responseHandler(res, 200, { count: halls.length, halls });
	} catch (error) {
		return next(
			new CustomError(
				500,
				'Seems like an error processing your request...',
				error
			)
		);
	}
};
exports.createHall = async (req, res, next) => {
	try {
		const newHall = await Hall.create({
			name: req.body.name,
			location: {
				city: req.body.city,
				state: req.body.state,
				country: req.body.country,
			},
		});
		return responseHandler(res, 201, { hall: newHall });
	} catch (error) {
		return next(
			new CustomError(
				400,
				'Seems there is a problem with your request..',
				error
			)
		);
	}
};

exports.getSingleHall = async (req, res, next) => {
	try {
		const { id } = req.params;
		const hall = await Hall.findById(id);
		if (!hall) {
			return next(new CustomError(404, 'Invalid ID or not found', { id }));
		}
		return responseHandler(res, 200, { hall });
	} catch (error) {
		return next(new CustomError(400, 'Error processing request', error));
	}
};

exports.updateHall = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedHall = await Hall.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedHall) {
			return next(new CustomError(404, 'Invalid ID or not Found'));
		}
		return responseHandler(res, 201, { hall: updatedHall });
	} catch (error) {
		return next(new CustomError(500, 'Error processing your request', error));
	}
};

exports.deleteAllHalls = async (req, res, next) => {
	try {
		await Hall.deleteMany({});

		return responseHandler(res, 204, null);
	} catch (error) {
		return next(new CustomError(500, 'Error processing request', error));
	}
};

exports.deleteSingleHall = async (req, res, next) => {
	try {
		const { id } = req.params;
		const hall = await Hall.findByIdAndDelete(id);
		if (!hall) {
			return next(new CustomError(404, 'Invalid ID or not found'));
		}
		return responseHandler(res, 204, null);
	} catch (error) {
		return next(new CustomError(500, 'Error processing request', error));
	}
};
