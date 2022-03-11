const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const textParser = require('html-to-text');
class Email {
	constructor(user, url) {
		this.firstname = user.firstname;
		this.to = user.email;
		this.from = `The Bookings and Reservation Team <lihemen@test.io>`;
		this.url = url;
	}

	transporter() {
		if (process.env.NODE_ENV === 'development') {
			return nodemailer.createTransport({
				host: 'smtp.mailtrap.io',
				port: 2525,
				auth: {
					user: process.env.MT_USER,
					pass: process.env.MT_PASS,
				},
			});
		}
		return nodemailer.createTransport({
			host: 'smtp.sendgrid.net',
			port: 465,
			auth: {
				user: 'apikey',
				pass: process.env.SENDGRID_API_KEY,
			},
		});
	}
	async send(template, subject) {
		const html = pug.renderFile(
			path.join(__dirname, `../../../views/emails/${template}.pug`),
			{
				firstname: this.firstname,
				details: this.details,
			}
		);
		const mailoptions = {
			to: this.to,
			from: this.from,
			subject: subject,
			text: textParser.fromString(html),
			html: html,
		};
		await this.transporter().sendMail(mailoptions);
	}
	async sendWelcome() {
		await this.send('welcome', 'Welcome to Bookings and Reservation');
	}
	async sendReservation(details) {
		this.details = details;
		await this.send('reservation', 'Reservation Details');
	}
	async sendConfirmation() {
		await this.send(
			'confirmation',
			'Reservation Confirmed. Thank you for choosing us'
		);
	}
	async sendPasswordReset() {
		await this.send('resetpassword', 'Password Reset');
	}
}

module.exports = Email;
