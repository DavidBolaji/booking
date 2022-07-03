const mongoose = require("mongoose");
const path = require("path");
const inbox = require("inbox");
const jsonTocsv = require("json2csv");
const mime = require("mime");
const Booking = require("../models/Booking");
const Bin = require("../models/Bin");
const responseHandler = require("../../utils/responseHandler");
const CustomError = require("../../utils/CustomError");
const APIFeatures = require("../../utils/APIFeatures");
const Email = require("../../utils/emailHandler");
const getAvailableDates = require("../../utils/getAvailability");
const Mongoose = require("mongoose");

const client = inbox.createConnection(993, "bookingreservation.com.ng", {
  secureConnection: true,
  auth: {
    user: process.env.BOOKRES_MAIL,
    pass: process.env.BOOKRES_MAIL_PASS,
  },
});
client.on("connect", () => {
  console.log("\n \t IMAP CONNECTED");
  client.openMailbox("INBOX", (error, info) => {
    if (error) {
      console.log("\n \t Error connecting to mailbox");
    }
  });
});
client.on("error", () => {
  console.log("\n \t Error establishing client connection");
});

exports.getAllExceptOneBookings = async (req, res, next) => {
  const { hallname, from, to, baseUrl } = req.params;

  let valFrom;
  let valTo;

  if (new Date(from).getMonth() < 10) {
    valFrom = from;
  } else {
    valFrom = `${from.split("-")[0]}-${parseInt(from.split("-")[1])}-${
      from.split("-")[2]
    }`;
  }

  if (new Date(from).getMonth() < 10) {
    valTo = to;
  } else {
    valTo = `${to.split("-")[0]}-${parseInt(to.split("-")[1])}-${
      to.split("-")[2]
    }`;
  }

  let dateFrom = new Date(valFrom);
  let dateTo = new Date(valTo);
  let prevMonth = dateFrom.setMonth(dateFrom.getMonth() - 1);
  let nextMonth = dateTo.setMonth(dateTo.getMonth() + 1);

  // _id: {$ne : new ObjectID(baseUrl)},

  const halls = await Booking.find({
    _id: { $ne: baseUrl },
    hallname,
    bookedFrom: { $gte: new Date(prevMonth) },
    bookedTo: { $lte: new Date(nextMonth) },
  });
  responseHandler(res, 200, halls);
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const count = await Booking.estimatedDocumentCount(req.query, function (
      err,
      count
    ) {
      return count;
    });
    const features = new APIFeatures(Booking.find(), req.query)
      .filter()
      .sort()
      .select()
      .pagination();

    const bookings = await features.query;
    // SEND RESPONSE
    return responseHandler(res, 200, {
      count: JSON.stringify(count),
      bookings,
    });
  } catch (error) {
    return next(
      new CustomError(
        500,
        "Seems like an error processing your request...",
        error
      )
    );
  }
};

exports.createBooking = async (req, res, next) => {
  console.log(req.body);
  try {
    if (
      new Date(req.body.bookedFrom).getTime() >
      new Date(req.body.bookedTo).getTime()
    ) {
      return next(new CustomError(400, "Invalid Date Selection"));
    }
    const newBooking = await Booking.create({
      //   user:
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      clientPhoneNumber: req.body.clientPhoneNumber,
      hallname: req.body.hallname,
      event: req.body.event,
      attendance: req.body.attendance,
      bookedFrom: req.body.bookedFrom,
      bookedTo: req.body.bookedTo,
      total: req.body.total,
      paid: req.body.paid,
      discount: req.body.discount,
    });
    if (!newBooking) {
      return next(new CustomError(400, "Error processing your request"));
    }
    try {
      // const reservationMail = new Email({
      // 	email: 'info@bookingreservation.com.ng',
      // });
      // await reservationMail.sendReservation(req.body);
      // const confirmationMail = new Email({
      // 	firstname: req.body.clientName,
      // 	email: req.body.clientEmail,
      // });
      // await confirmationMail.sendConfirmation();
    } catch (error) {
      console.log(error);
    }
    return responseHandler(res, 201, { booking: newBooking });
  } catch (error) {
    if (error.message == "Duplicate Entry") {
      return next(new CustomError(422, error.message, error));
    }
    return next(new CustomError(500, "Something went wrong, try again", error));
  }
};

exports.multipleBooking = async (req, res, next) => {
  const hol = req.body.map((e) => {
    return {
      ...e,
      [e.user]: req.body.user,
    };
  });
  try {
    const newBooking = await Booking.insertMany(hol);
    if (!newBooking) {
      return next(new CustomError(400, "Error processing your request"));
    }

    return responseHandler(res, 201, { booking: newBooking });
  } catch (error) {
    return next(new CustomError(500, "Something went wrong, try again", error));
  }
};

exports.getSingleBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return next(new CustomError(404, "Invalid ID or not found", { id }));
    }
    return responseHandler(res, 200, { booking });
  } catch (error) {
    return next(new CustomError(400, "Error processing request", error));
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    console.log(booking.user, req.body[0].user);
    if (booking.user != req.body[0].user) {
      return next(new CustomError(401, "Unauthorized"));
    }
    const updatedBooking = await Booking.updateOne(
      { _id: id },
      {
        $set: {
          clientName: req.body[0].clientName,
          clientEmail: req.body[0].clientEmail,
          clientPhoneNumber: req.body[0].clientPhoneNumber,
          hallname: req.body[0].hallname,
          event: req.body[0].event,
          attendance: req.body[0].attendance,
          bookedFrom: req.body[0].bookedFrom && req.body[0].bookedFrom,
          bookedTo: req.body[0].bookedTo && req.body[0].bookedTo,
          total: req.body[0].total,
          paid: req.body[0].paid,
          user: req.body[0].user,
        },
      }
    );
    if (!updatedBooking) {
      return next(new CustomError(404, "Invalid ID or not Found"));
    }
    return responseHandler(res, 201, { booking: updatedBooking });
  } catch (error) {
    return next(new CustomError(500, "Error processing your request", error));
  }
};

exports.deleteAllBookings = async (req, res, next) => {
  try {
    await Booking.deleteMany({});

    return responseHandler(res, 204, null);
  } catch (error) {
    return next(new CustomError(500, "Error processing request", error));
  }
};

exports.deleteSingleBooking = async (req, res, next) => {
  try {
    const { id, user } = req.params;
    const bookBin = await Booking.find({ _id: id });

    if (user != bookBin[0].user) {
      console.log("notpassed");
      return next(new CustomError(401, "Unauthorized"));
    }
    console.log(bookBin);
    if (bookBin) {
      const bin = await Bin.create({
        clientName: bookBin[0].clientName,
        clientEmail: bookBin[0].clientEmail,
        clientPhoneNumber: bookBin[0].clientPhoneNumber,
        hallname: bookBin[0].hallname,
        event: bookBin[0].event,
        attendance: bookBin[0].attendance,
        bookedFrom: bookBin[0].bookedFrom && bookBin[0].bookedFrom,
        bookedTo: bookBin[0].bookedTo && bookBin[0].bookedTo,
        paid: bookBin[0].paid,
        total: bookBin[0].total,
        discount: bookBin[0].discount,
        user: bookBin[0].user,
      });

      //   if (!bin) throw new Error("ERROR");

      const deleteBook = await Booking.remove({ _id: { $eq: id } });

      if (!deleteBook) {
        return next(new CustomError(404, "Invalid ID or not found"));
      }
      return responseHandler(res, 204, null);
    }
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, "Error processing request", error));
  }
};

exports.download = async (req, res, next) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $addFields: {
          bookedFrom: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$bookedFrom",
            },
          },
          bookedTo: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$bookedTo",
            },
          },
        },
      },
    ]);

    const fields = [
      "clientName",
      "clientEmail",
      "clientPhoneNumber",
      "hallname",
      "attendance",
      "event",
      "bookedFrom",
      "bookedTo",
    ];
    const fieldNames = [
      "Client Name",
      "Client Email",
      "Client Phone Number",
      "Hallname",
      "Event Attendance",
      "Event",
      "Booked From",
      "Booked To",
    ];
    const excel = jsonTocsv({
      data: bookings,
      fields: fields,
      fieldNames: fieldNames,
    });
    const writeStream = fs.createWriteStream(
      path.join(__dirname, "../../../../public/bookings.csv")
    );
    writeStream.write(excel);
    writeStream.end();
    const file = path.join(__dirname, "../../../../public/bookings.csv");

    const filename = path.basename(file);
    const mimetype = mime.getType(file);
    res.header("Content-disposition", "attachment; filename=" + filename);
    res.header("Content-type", mimetype);
    writeStream.on("finish", () => {
      res.status(200).sendFile(file, (err) => {
        if (err) {
          return next(new CustomError(400, "Problem with request", err));
        }
      });
    });
  } catch (error) {
    return next(
      new CustomError(500, "Seems like a problem just occurred", error)
    );
  }
};
// {$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}
exports.getAvailableDates = async (req, res, next) => {
  try {
    const { hallname, from, to } = req.params;
    const replaced = hallname.replace(/%20/g, " ");
    const bookings = await Booking.aggregate([
      {
        $match: {
          hallname: replaced,
        },
      },
      {
        $project: {
          _id: 0,
          bookedFrom: 1,
          bookedTo: 1,
        },
      },
    ]);
    if (bookings.length < 1) {
      return next(new CustomError(404, "All dates are available", []));
    }
    const bookedMap = [...bookings]
      .sort((a, b) => {
        new Date(a).getTime() - new Date(b).getTime();
      })
      .map((book) => [book.bookedFrom, book.bookedTo]);
    const availableDates = getAvailableDates([from, to], bookedMap);
    responseHandler(res, 200, availableDates);
  } catch (error) {
    return next(new CustomError(500, "Seems like an error has occured", error));
  }
};

exports.getBookedDates = async (req, res, next) => {
  const { hallname, from, to } = req.params;

  let valFrom;
  let valTo;

  if (new Date(from).getMonth() < 10) {
    valFrom = from;
  } else {
    valFrom = `${from.split("-")[0]}-${parseInt(from.split("-")[1])}-${
      from.split("-")[2]
    }`;
  }

  if (new Date(from).getMonth() < 10) {
    valTo = to;
  } else {
    valTo = `${to.split("-")[0]}-${parseInt(to.split("-")[1])}-${
      to.split("-")[2]
    }`;
  }

  let dateFrom = new Date(valFrom);
  let dateTo = new Date(valTo);
  let prevMonth = dateFrom.setMonth(dateFrom.getMonth() - 1);
  let nextMonth = dateTo.setMonth(dateTo.getMonth() + 1);

  const halls = await Booking.find({
    hallname,
    bookedFrom: { $gte: new Date(prevMonth) },
    bookedTo: { $lte: new Date(nextMonth) },
  });
  responseHandler(res, 200, halls);
};

exports.getAllDates = async (req, res, next) => {
  const { from, to } = req.params;
  let valFrom;
  let valTo;
  if (new Date(from).getMonth() < 10) {
    valFrom = from;
  } else {
    valFrom = `${from.split("-")[0]}-${parseInt(from.split("-")[1])}-${
      from.split("-")[2]
    }`;
  }

  if (new Date(from).getMonth() < 10) {
    valTo = to;
  } else {
    valTo = `${to.split("-")[0]}-${parseInt(to.split("-")[1])}-${
      to.split("-")[2]
    }`;
  }

  let dateFrom = new Date(valFrom);
  let dateTo = new Date(valTo);
  let prevMonth = dateFrom.setMonth(dateFrom.getMonth() - 1);
  let nextMonth = dateTo.setMonth(dateTo.getMonth() + 1);

  const halls = await Booking.find({
    bookedFrom: { $gte: new Date(prevMonth) },
    bookedTo: { $lte: new Date(nextMonth) },
  });
  responseHandler(res, 200, halls);
};

exports.getBookedDatesHover = async (req, res, next) => {
  const { hallname, from } = req.params;
  const hall = await Booking.find({ hallname, bookedFrom: from });
  responseHandler(res, 200, hall);
};

exports.getUnfilteredBookings = async (req, res, next) => {
  const { search, value } = req.params;
  try {
    const count = await Booking.estimatedDocumentCount(req.query, function (
      err,
      count
    ) {
      return count;
    });
    let booking;
    if (search === "clientName") {
      booking = await Booking.find({ clientName: { $regex: value } });
    } else if (search === "clientEmail") {
      booking = await Booking.find({ clientEmail: { $regex: value } });
    } else if (search === "hallname") {
      booking = await Booking.find({ hallname: { $regex: value } });
    } else if (search === "bookedFrom") {
      booking = await Booking.find({ bookedFrom: { $gte: new Date(value) } });
    }

    responseHandler(res, 200, {
      count: JSON.stringify(count),
      booking,
    });
  } catch (error) {
    return next(
      new CustomError(
        500,
        "Seems like an error processing your request...",
        error
      )
    );
  }

  // responseHandler(res, 200, hall);
};

exports.getUnfilteredBookings2 = async (req, res, next) => {
  const { valueF, valueT } = req.params;
  try {
    const count = await Booking.estimatedDocumentCount(req.query, function (
      err,
      count
    ) {
      return count;
    });
    let booking;

    booking = await Booking.find({
      bookedFrom: { $gte: new Date(valueF) },
      bookedTo: { $lte: new Date(valueT) },
    });

    responseHandler(res, 200, {
      count: JSON.stringify(count),
      booking,
    });
  } catch (error) {
    return next(
      new CustomError(
        500,
        "Seems like an error processing your request...",
        error
      )
    );
  }

  // responseHandler(res, 200, hall);
};

exports.croneDelete = async (req, res, next) => {
  const { day } = req.params;

  const hall = await Booking.find({ bookedTo: { $lt: new Date(day) } });

  if (hall) {
    const bin = await Bin.insertMany(hall);

    if (!bin) throw new Error("ERROR");

    const deleteBook = await Booking.deleteMany({
      bookedTo: { $lt: new Date(day) },
    });

    if (!deleteBook) {
      return next(new CustomError(404, "Invalid ID or not found"));
    }
    return responseHandler(res, 204, null);
  }

  responseHandler(res, 200, hall);
};

client.connect();
