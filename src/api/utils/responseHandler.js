const responseHandler = (res, status, data = []) => {
	res.status(status).json({
		status: 'success',
		data: data,
	});
};

module.exports = responseHandler;
