const router = require("express").Router();
// STAFF CONTROLLER
const staffController = require("../controllers/staffController");
// BOOKINGS CONTROLLER
const bookingsController = require("../controllers/bookingsController");
// BINS CONTROLLER
const binsController = require("../controllers/binController");
// HALLS CONTROLLER
const hallsController = require("../controllers/hallsController");
// AUTH CONTROLLER
const authController = require("../controllers/authController");
// AUTHENTICATION & AUTHORIZATION
const protect = require("../../middleware/authentication");
const restrictTo = require("../../middleware/authorization");
// SPECIAL

router
  .route(
    "/bookings/edit/getavailability/halls/:hallname/from/:from/to/:to/id/:baseUrl"
  )
  .get(protect, bookingsController.getAllExceptOneBookings);

// router.post('auth/test', authController.test)
router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signup);
router.post("/auth/forgotpassword", authController.forgotPassword);
router.post("/auth/logout", protect, authController.logout);
router.patch("/auth/resetpassword/:token", authController.resetPassword);
router.patch("/auth/updatepassword", protect, authController.updatePassword);
// STAFF
router.route("/staff").get(protect, staffController.getAllStaffs);
router
  .route("/staff/:id")
  .get(protect, staffController.getSingleStaff)
  .patch(protect, staffController.updateStaff);
router.delete("/staff/delete-me", protect, staffController.deleteMe);

// HALLS
router
  .route("/halls")
  .get(protect, hallsController.getAllHalls)
  .post(protect, hallsController.createHall)
  .delete(protect, restrictTo("admin"), hallsController.deleteAllHalls);

router
  .route("/halls/:id")
  .get(protect, hallsController.getSingleHall)
  .patch(protect, restrictTo("admin", "support"), hallsController.updateHall)
  .delete(protect, restrictTo("admin"), hallsController.deleteSingleHall);

// BOOKINGS
router.post("/bookings/many", protect, bookingsController.multipleBooking);

router
  .route("/bookings")
  .get(protect, bookingsController.getAllBookings)
  .post(protect, bookingsController.createBooking)
  .delete(protect, bookingsController.deleteAllBookings);

router
  .route("/no-filter/bookings/search/:search/value/:value")
  .get(protect, bookingsController.getUnfilteredBookings);

router.get(
  "/bookings/getavailability/halls/:hallname/from/:from/to/:to",
  protect,
  bookingsController.getAvailableDates
);

router.get(
  "/bookings/getall/from/:from/to/:to",
  protect,
  bookingsController.getAllDates
);

router.get(
  "/bookingss/getavailability/halls/:hallname/from/:from/to/:to",
  protect,
  bookingsController.getBookedDates
);

router.get(
  "/bookingz/getavailability/hall/:hallname/from/:from",
  protect,
  bookingsController.getBookedDatesHover
);

router.get("/download", protect, bookingsController.download);

router.delete(
  "/bookings/crone/day/:day",
  protect,
  bookingsController.croneDelete
);

router
  .route("/bookings/:id/:user")
  .get(protect, bookingsController.getSingleBooking)
  .patch(protect, bookingsController.updateBooking)
  .delete(protect, bookingsController.deleteSingleBooking);

router
  .route("/bins")
  .get(protect, binsController.getAllBins)
  .delete(protect, binsController.deleteAllBins);

router
  .route("/no-filter/bins/search/:search/value/:value")
  .get(protect, binsController.getUnfilteredBins);

router.route("/bins/restore/:id").get(protect, binsController.restoreBooking);

router.route("/bins/:id").delete(protect, binsController.deleteSingleBin);

module.exports = router;
