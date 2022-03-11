const nodemailer = require('nodemailer');
const sg = require('@sendgrid/mail');
const inbox = require('inbox');

sg.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
	// CREATE TRANSPORTER
	const transporter = nodemailer.createTransport({
		host: 'smtp.sendgrid.net',
		port: 465,
		auth: {
			user: 'apikey',
			pass: process.env.SENDGRID_API_KEY,
		},
	});
	// DEFINE OPTIONS
	const mailOptions = {
		from: options.from,
		to: options.to,
		subject: options.subject,
		text: options.text || undefined,
		html: options.html || undefined,
	};
	// SEND EMAIL
	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
