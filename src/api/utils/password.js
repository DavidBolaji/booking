const bcrypt = require('bcryptjs');

exports.hashPassword = (password) => {
	return bcrypt.hash(password, 11);
};

exports.comparePassword = (password, hash) => {
	return bcrypt.compare(password, hash);
};
