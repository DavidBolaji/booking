const mongoose = require("mongoose");
const crypto = require("crypto");
const { default: validator } = require("validator");
const { hashPassword, comparePassword } = require("../../utils/password");
const StaffSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: [25, "A firstname cannot be more than 25 characters"],
    validate: {
      validator: function (val) {
        return validator.isAlpha(val);
      },
      message: "A firstname can only contain letters",
    },
    trim: true,
    required: [true, "This field is required"],
  },
  lastname: {
    type: String,
    maxlength: [25, "A lastname cannot be more than 25 characters"],
    validate: {
      validator: function (val) {
        return validator.isAlpha(val);
      },
      message: "A lastname can only contain letters",
    },
    trim: true,
    required: [true, "This field is required"],
  },
  email: {
    type: String,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: "Invalid email supplied",
    },
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, "This field is required"],
  },
  role: {
    type: String,
    enum: ["basic", "support", "admin"],
    default: "basic",
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: [true, "This field is required"],
    select: 0,
  },
  confirmPassword: {
    type: String,
    trim: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match",
    },
    required: [true, "This field is required"],
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  passwordLastChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: 0,
  },
});

// DOCUMENT MIDDLEWARE
StaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hashPassword(this.password);
  this.confirmPassword = undefined;
  next();
});
StaffSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordLastChangedAt = Date.now();
  next();
});
// QUERY MIDDLEWARE
StaffSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  this.select("-__v");
  next();
});

// INSTANCE METHOD
StaffSchema.methods.validatePassword = async function (password, hash) {
  return await comparePassword(password, hash);
};

StaffSchema.methods.changedPasswordRecent = function (jwtTimestamp) {
  if (this.passwordLastChangedAt) {
    const timeStamp = parseInt(this.passwordLastChangedAt.getTime() / 1000, 10);

    return jwtTimestamp < timeStamp;
  }
  return false;
};

StaffSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 3600000;
  return resetToken;
};

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
