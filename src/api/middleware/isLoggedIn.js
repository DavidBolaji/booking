const CustomError = require('../utils/CustomError');
const { verifyToken } = require('../utils/jwtToken');
const Staff = require('../v1/models/Staff');
// ONLY FOR RENDERED PAGES
module.exports = async (req, res, next) => {
	try {
		//GET TOKEN AND VALIDATE
		if (!req.cookies.jwt) {
			return res.redirect('/login');
		}
		// VERIFY TOKEN
		const token = req.cookies.jwt;
		const validated = verifyToken(token);

		// CHECK IF USER EXISTS
		const staff = await Staff.findById(validated.id);
		if (!staff) {
			return res.redirect('/login');
		}
		// CHECK FOR PASSWORD CHANGE AFTER TOKEN ISSUE
		if (staff.changedPasswordRecent(validated.iat)) {
			return res.redirect('/login');
		}
		// USER IS LOGGED IN
		res.locals.user = staff;
		return next();
	} catch (error) {
		if (
			error.name === 'JsonWebTokenError' ||
			error.name === 'TokenExpiredError'
		) {
			return res.redirect('/login');
		}
		return next(
			new CustomError(500, 'Seems like something went wrong, try again', error)
		);
	}
};
