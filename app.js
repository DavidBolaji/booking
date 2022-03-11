const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { default: sslredirect } = require('heroku-ssl-redirect');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./src/api/utils/errorHandler');
const CustomError = require('./src/api/utils/CustomError');
const routes = require('./src/api/v1/routes/index');
const viewRoutes = require('./src/api/v1/routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// app.use(helmet());
app.use(cookieParser());

app.use(cors());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
if (process.env.NODE_ENV === 'production') {
	app.use(sslredirect());
}
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());
app.use(xss());
app.use(
	hpp({
		whitelist: [
			'attendance',
			'bookedFrom',
			'bookedTo',
			'ratingsAverage',
			'ratingsQuantity',
		],
	})
);

// MY MIDDLEWARES
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// ROUTES
app.use('/', viewRoutes);
app.use('/api/v1', routes);

// Unrecognized and bad routes from user
app.all('*', (req, res, next) => {
	const error = new CustomError(
		404,
		`The route ${req.method} ${req.url} is not recognized`
	);
	next(error);
});
// Errors from the system
app.use((error, req, res, next) => {
	errorHandler(error, req, res);
});
module.exports = app;
