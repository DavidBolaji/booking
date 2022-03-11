const router = require('express').Router();
const viewsController = require('../controllers/viewsController');

const isLoggedIn = require('../../middleware/isLoggedIn');

router.get('/login', viewsController.getLogin);
router.get('/register', viewsController.getRegister);
router.get('/', isLoggedIn, viewsController.getHome);
router.get('/book', isLoggedIn, viewsController.getBookingPortal);
router.get('/bookings', isLoggedIn, viewsController.getBookings);
router.get('/bookings-table', isLoggedIn, viewsController.getBookingsTable);
router.get('/bookings/:id', isLoggedIn, viewsController.getSingleBooking);
router.get('/staffs', isLoggedIn, viewsController.getStaffs);
router.get('/halls', isLoggedIn, viewsController.getHalls);
router.get('/calender', isLoggedIn, viewsController.getCalender);
router.get('/bin', isLoggedIn, viewsController.getBin);

module.exports = router;
