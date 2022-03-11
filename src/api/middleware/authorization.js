const CustomError = require('../utils/CustomError');

module.exports = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new CustomError(403, 'You do not have permission to view this resource')
			);
		}
		next();
	};
};
