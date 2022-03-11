const jwt = require('jsonwebtoken');
const responseHandler = require('./responseHandler');
exports.signToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.XPIRATION,
	});
};

exports.verifyToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

exports.createAndSendToken = (user, res, statusCode) => {
	const token = this.signToken({ id: user._id });
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 3600000),
		httpOnly: false,
	};
	// if (process.env.NODE_ENV === 'production') {
	// 	cookieOptions.secure = true;
	// }
	res.cookie('jwt', token, cookieOptions);

	user.password = undefined;
	return responseHandler(res, statusCode, { token });
};
