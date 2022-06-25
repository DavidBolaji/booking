const fs = require("fs");
const path = require("path");
const inbox = require("inbox");
const jsonTocsv = require("json2csv");
const mime = require("mime");
const Bin = require("../models/Bin");
const Booking = require("../models/Booking");
const responseHandler = require("../../utils/responseHandler");
const CustomError = require("../../utils/CustomError");
const APIFeatures = require("../../utils/APIFeatures");
const Email = require("../../utils/emailHandler");
const getAvailableDates = require("../../utils/getAvailability");

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

exports.getAllBins = async (req, res, next) => {
  try {
    const count = await Bin.estimatedDocumentCount(req.query, function (
      err,
      count
    ) {
      return count;
    });
    const features = new APIFeatures(Bin.find(), req.query)
      .filter()
      .sort()
      .select()
      .pagination();

    const bin = await features.query;
    // SEND RESPONSE
    return responseHandler(res, 200, {
      count: JSON.stringify(count),
      bin,
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

exports.createBin = async (req, res, next) => {
  try {
    if (
      new Date(req.body.bookedFrom).getTime() >
      new Date(req.body.bookedTo).getTime()
    ) {
      return next(new CustomError(400, "Invalid Date Selection"));
    }
    const newBin = await Booking.create({
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
    });
    if (!newBin) {
      return next(new CustomError(400, "Error processing your request"));
    }

    return responseHandler(res, 201, { bin: newBin });
  } catch (error) {
    if (error.message == "Duplicate Entry") {
      return next(new CustomError(422, error.message, error));
    }
    return next(new CustomError(500, "Something went wrong, try again", error));
  }
};

exports.getSingleBin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bin = await Bin.findById(id);
    if (!booking) {
      return next(new CustomError(404, "Invalid ID or not found", { id }));
    }
    return responseHandler(res, 200, { bin });
  } catch (error) {
    return next(new CustomError(400, "Error processing request", error));
  }
};

exports.updateBin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBin = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBin) {
      return next(new CustomError(404, "Invalid ID or not Found"));
    }
    return responseHandler(res, 201, { bins: updatedBin });
  } catch (error) {
    return next(new CustomError(500, "Error processing your request", error));
  }
};

exports.deleteAllBins = async (req, res, next) => {
  try {
    await Bin.deleteMany({});

    return responseHandler(res, 204, null);
  } catch (error) {
    return next(new CustomError(500, "Error processing request", error));
  }
};

exports.deleteSingleBin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bin = await Bin.findByIdAndDelete(id);
    if (!bin) {
      return next(new CustomError(404, "Invalid ID or not found"));
    }
    return responseHandler(res, 204, null);
  } catch (error) {
    return next(new CustomError(500, "Error processing request", error));
  }
};

exports.getAvailableDates = async (req, res, next) => {
  try {
    const { hallname, from, to } = req.params;
    const replaced = hallname.replace(/%20/g, " ");
    const bins = await Bin.aggregate([
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
    if (bins.length < 1) {
      return next(new CustomError(404, "All dates are available", []));
    }
    const binMap = [...bins]
      .sort((a, b) => {
        new Date(a).getTime() - new Date(b).getTime();
      })
      .map((bin) => [bin.bookedFrom, bin.bookedTo]);
    const availableDates = getAvailableDates([from, to], binMap);
    responseHandler(res, 200, availableDates);
  } catch (error) {
    return next(new CustomError(500, "Seems like an error has occured", error));
  }
};

exports.getBinDates = async (req, res, next) => {
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

exports.getUnfilteredBins = async (req, res, next) => {
  const { search, value } = req.params;
  try {
    const count = await Bin.estimatedDocumentCount(req.query, function (
      err,
      count
    ) {
      return count;
    });
    let bin;
    if (search === "clientName") {
      bin = await Bin.find({ clientName: { $regex: value } });
    } else if (search === "clientEmail") {
      bin = await Bin.find({ clientEmail: { $regex: value } });
    } else if (search === "hallname") {
      bin = await Bin.find({ hallname: { $regex: value } });
    } else if (search === "bookedFrom") {
      console.log(new Date(value));
      bin = await Bin.find({ bookedFrom: { $gte: new Date(value) } });
    }

    responseHandler(res, 200, {
      count: JSON.stringify(count),
      bin,
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

exports.restoreBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const bookBin = await Bin.find({ _id: id });

    console.log(bookBin);

    if (bookBin) {
      const booking = await Booking.create({
        clientName: bookBin[0].clientName,
        clientEmail: bookBin[0].clientEmail,
        clientPhoneNumber: bookBin[0].clientPhoneNumber,
        hallname: bookBin[0].hallname,
        event: bookBin[0].event,
        attendance: bookBin[0].attendance,
        bookedFrom: bookBin[0].bookedFrom && bookBin[0].bookedFrom,
        bookedTo: bookBin[0].bookedTo && bookBin[0].bookedTo,
        total: bookBin[0].total,
        paid: bookBin[0].paid,
        discount: bookBin[0].discount,
        user: bookBin[0].user,
      });

      console.log(booking);

      if (!booking) throw new Error("ERROR");

      const deleteBookBin = await Bin.remove({ _id: { $eq: id } });

      if (!deleteBookBin) {
        return next(new CustomError(404, "Invalid ID or not found"));
      }
      return responseHandler(res, 204, null);
    }
  } catch (error) {
    return next(new CustomError(500, "Error processing request", error));
  }
};

client.connect();
