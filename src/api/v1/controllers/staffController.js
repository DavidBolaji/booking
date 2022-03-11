const Staff = require('../models/Staff');
const responseHandler = require('../../utils/responseHandler');
const CustomError = require('../../utils/CustomError');
const APIFeatures = require('../../utils/APIFeatures');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((key) => {
		if (allowedFields.includes(key)) newObj[key] = obj[key];
	});
	return newObj;
};

exports.getAllStaffs = async (req, res, next) => {
	try {
		const features = new APIFeatures(Staff.find(), req.query)
			.filter()
			.sort()
			.select()
			.pagination();

		const staffs = await features.query;

		return responseHandler(res, 200, staffs);
	} catch (error) {
		return next(
			new CustomError(500, 'Error Fetching staff from database', error)
		);
	}
};

exports.getSingleStaff = async (req, res, next) => {
	try {
		const { id } = req.params;
		const staff = await Staff.findById(id);
		if (!staff) {
			return next(new CustomError(404, 'Invalid ID or staff not found'));
		}
		return responseHandler(res, 200, staff);
	} catch (error) {
		return next(
			new CustomError(500, 'Seems like something went wrong, try again', error)
		);
	}
};

exports.updateStaff = async (req, res, next) => {
	try {
		if (req.body.password || req.body.confirmPassword) {
			return next(
				new CustomError(403, 'You cannot update password via this resource')
			);
		}
		const filteredBody = filterObj(req.body, 'name', 'email');
		const updatedStaff = await Staff.findByIdAndUpdate(
			req.user.id,
			filteredBody,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updatedStaff) {
			return next(new CustomError(400, 'Error processing your request'));
		}
		return responseHandler(res, 200, { staff: updatedStaff });
	} catch (error) {
		return next(new CustomError(500, 'Seems like something went wrong', error));
	}
};

exports.adminUpdatesStaff = async (req, res, next) => {
	try {
	} catch (error) {
		return next(
			new CustomError(500, 'Seems like something went terribly wrong')
		);
	}
};

exports.deleteMe = async (req, res, next) => {
	try {
		await Staff.findByIdAndUpdate(req.user.id, { active: false });
		return responseHandler(res, 204, null);
	} catch (error) {
		return next(new CustomError(500, 'Seems like something went wrong', error));
	}
};
