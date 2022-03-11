const CustomError = require('../utils/CustomError');
const { verifyToken } = require('../utils/jwtToken');
const Staff = require('../v1/models/Staff');
module.exports = async (req, res, next) => {
	try {
		let token;
		//GET TOKEN AND VALIDATE
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		} else if (req.cookies.jwt) {
			token = req.cookies.jwt;
		}
		if (!token) {
			return next(
				new CustomError(
					403,
					'Cannot view the requested resource, login and try again'
				)
			);
		}
		const validated = verifyToken(token);

		// CHECK IF USER EXISTS
		const staff = await Staff.findById(validated.id);
		if (!staff) {
			return next(
				new CustomError(401, 'Invalid token. This staff no longer exists')
			);
		}
		// CHECK FOR PASSWORD CHANGE AFTER TOKEN ISSUE
		if (staff.changedPasswordRecent(validated.iat)) {
			return next(
				new CustomError(
					401,
					'Token no longer valid. Please login and try again'
				)
			);
		}
		req.user = staff;
		next();
	} catch (error) {
		if (
			error.name === 'JsonWebTokenError' ||
			error.name === 'TokenExpiredError'
		) {
			return next(new CustomError(401, 'Invalid token, login and try again'));
		}
		return next(
			new CustomError(500, 'Seems like somthing went wrong...', error)
		);
	}
};
