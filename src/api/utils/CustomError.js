class CustomError extends Error {
	constructor(statusCode, message, data = []) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		this.isOperational = true;
		this.data = data;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = CustomError;
