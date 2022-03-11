const http = require('http');
require('dotenv').config('./');


process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION!! SHUTTING DOWN');
	console.log({
		errorName: err.name,
		error: err.message,
		stack: err.stack,
	});
	process.exit(1);
});

const app = require('./app');
const port = normalizePort(process.env.PORT || 5000);
const server = http.createServer(app);
const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'development') {
	mongoose
		.connect(process.env.MONGO_LOCAL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => print(`Database connected: ${Date()}`))
		.catch((err) => print(err.message));
} else if (process.env.NODE_ENV === 'production') {
	mongoose
		.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => print(`Database connected: ${Date()}`))
		.catch((err) => print(err.message));
}

server.on('error', onError);
server.on('listening', onListening);
server.listen(port, () => {
	print(`Server date: ${Date()}`);
});

function normalizePort(val) {
	let port = parseInt(val, 10);

	if (isNaN(port)) return val;

	if (port > 0) return port;

	return false;
}

function onError(error) {
	if (error.syscall !== 'listen') throw error;
	let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port' + port;
	switch (error.code) {
		case 'EACCES':
			print(`${bind} Requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			print(`${bind} Address currently in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;
	print(`Server started on ${bind}`);
}

const print = (message) => console.log(`\n \t ${message}`);

process.on('unhandledRejection', (err) => {
	console.log({
		errorName: err.name,
		error: err.message,
		stack: err.stack,
	});
	console.log('UNHANDLED REJECTION!! SHUTTING DOWN');
	server.close(() => {
		process.exit(1);
	});
});
