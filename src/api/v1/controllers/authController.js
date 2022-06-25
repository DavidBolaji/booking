const crypto = require("crypto");
const Staff = require("../models/Staff");
const CustomError = require("../../utils/CustomError");
const responseHandler = require("../../utils/responseHandler");
const sendEmail = require("../../utils/email");
const Email = require("../../utils/emailHandler");
const { signToken } = require("../../utils/jwtToken");

const createAndSendToken = (user, res, statusCode) => {
  const token = signToken({ id: user._id });
  const newId = user._id;
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 3600000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);

  console.log(newId);

  user.password = undefined;
  return responseHandler(res, statusCode, { token }, newId);
};

exports.signup = async (req, res, next) => {
  try {
    const newStaff = await Staff.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    // try {
    // 	const emailHandler = new Email(newStaff, null);
    // 	await emailHandler.sendWelcome();
    // } catch (error) {}
    return createAndSendToken(newStaff, res, 201);
  } catch (error) {
    return next(
      new CustomError(400, "Staff could not be created, try again...", error)
    );
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if email and password in request
    if (!email || !password) {
      return next(new CustomError(400, "Please fill out both fields"));
    }
    // Check if Staff exists
    const staff = await Staff.findOne({ email: email }).select("+password");
    if (!staff || !(await staff.validatePassword(password, staff.password))) {
      return next(new CustomError(401, "Authorization failed"));
    }
    // Send Token on success
    return createAndSendToken(staff, res, 200);
  } catch (error) {
    return next(
      new CustomError(500, "Seems like something went wrong...", error)
    );
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    return responseHandler(res, 204, null);
  } catch (error) {
    return next(new CustomError(500, "Seems like something went wrong", error));
  }
};

exports.forgotPassword = async (req, res, next) => {
  // GET Staff BASED ON EMAIL
  const staff = await Staff.findOne({ email: req.body.email });

  if (!staff) {
    return next(new CustomError(404, "No Staff found with that email"));
  }
  // GENERATE RANDOM TOKEN
  const resetToken = staff.createPasswordResetToken();

  await staff.save({ validateBeforeSave: false });
  // SEND BACK AS EMAIL
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;
  try {
    const emailHandler = new Email(staff, resetURL);
    await emailHandler.sendPasswordReset();
  } catch (error) {
    staff.passwordResetToken = undefined;
    staff.passwordResetExpires = undefined;
    await staff.save({ validateBeforeSave: false });

    return next(
      new CustomError(500, "Error sending the reset email, try again")
    );
  }
  return responseHandler(res, 200, {
    message: "Password reset succesful. Email sent!!!",
  });
};

exports.resetPassword = async (req, res, next) => {
  try {
    // GET STAFF BASED ON TOKEN
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const staff = await Staff.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    // SET NEW PASSWORD IF STAFF AND TOKEN !EXPIRED
    if (!staff) {
      return next(new CustomError(400, "Token has expired or no staff found"));
    }
    // UPDATE PASSWORD AND PASSWORDLASTCHANGEDAT
    staff.password = req.body.password;
    staff.confirmPassword = req.body.confirmPassword;
    staff.resetToken = undefined;
    staff.passwordResetExpires = undefined;
    await staff.save();

    // LOGIN STAFF
    return createAndSendToken(staff, res, 200);
  } catch (error) {
    return next(
      new CustomError(500, "Seems like something went wrong...", error)
    );
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    // FIND USER
    const staff = await Staff.findById(req.user.id).select("+password");
    // CHECK IF PASSWORDS MATCH
    const validated = await user.validatePassword(
      req.body.passwordCurrent,
      staff.password
    );
    if (!validated) {
      return next(new CustomError(401, "Invalid password, try again"));
    }
    // UPDATE PASSWORD
    staff.password = req.body.password;
    staff.confirmPassword = req.body.confirmPassword;
    await staff.save();
    // LOGIN STAFF
    createAndSendToken(staff, res, 200);
  } catch (error) {
    return next(
      new CustomError(500, "Seems like something went wrong...", error)
    );
  }
};
