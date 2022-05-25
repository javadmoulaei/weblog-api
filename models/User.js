const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { schema } = require("../validation/user");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

userSchema.pre("save", async (next) => {
  let user = this;

  if (!user.isModified("password")) return next();

  const hash = await bcrypt.hash(
    user.password,
    parseInt(process.env.BCRYPT_SALT)
  );
  user.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
