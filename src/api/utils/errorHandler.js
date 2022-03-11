const CustomError = require('./CustomError');

const handleCastErrorDB = (err) => {
	return new CustomError(400, `Invalid ${err.path}: ${err.value}`);
};
const handleDuplicateFieldErrorDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	console.log(value);
	return new CustomError(
		400,
		`Duplicate Field(s): ${value}, Please use another value`
	);
};
const sendErrorDev = (err, req, res) => {
	// User defined errors
	if (err.statusCode) {
		res.status(err.statusCode).json({
			status: 'fail',
			error: err.message,
			data: err.data,
			stack: err.stack,
		});
	}
	// System generated error
	else if (err.status) {
		res.status(err.status).json({
			status: 'error',
			error: err.message,
			data: err,
			stack: err.stack,
		});
	}
	// Uncaught error
	else {
		res.status(500).json({
			status: 'error',
			error: 'Internal Server Error',
			data: err,
			stack: err.stack,
		});
	}
};

const sendErrorProd = (err, req, res) => {
	if (err.isOperational) {
		// User defined errors
		if (err.statusCode) {
			res.status(err.statusCode).json({
				status: 'fail',
				error: err.message,
			});
		}
		// System generated error
		else if (err.status) {
			res.status(err.status).json({
				status: 'error',
				error: err.message,
			});
		}
	} // Uncaught error
	else {
		console.error('ERROR ❌', err);
		res.status(500).json({
			status: 'error',
			error: 'Internal Server Error',
		});
	}
};

const errorHandler = (err, req, res) => {
	if (process.env.NODE_ENV === ('development' || 'test')) {
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === 'production') {
		sendErrorProd(err, req, res);
	}
};
module.exports = errorHandler;
