const jwt = require("jsonwebtoken");

const User = require("../../models/User");

exports.get = async (req, res) => {
  res.render("forgetPass", {
    pageTitle: "فراموشی رمز عبور",
    path: "/login",
    message: req.flash("success_msg"),
    error: req.flash("error"),
  });
};

exports.post = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    req.flash("error", "کاربری با ایمیل در پایگاه داده ثبت نیست");

    return res.render("forgetPass", {
      pageTitle: "فراموشی رمز عبور",
      path: "/login",
      message: req.flash("success_msg"),
      error: req.flash("error"),
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const resetLink = `${process.env.URL}/users/reset-password/${token}`;

  sendEmail(
    user.email,
    user.fullname,
    "فراموشی رمز عبور",
    `
          جهت تغییر رمز عبور فعلی رو لینک زیر کلیک کنید
          <a href="${resetLink}">لینک تغییر رمز عبور</a>
      `
  );

  req.flash("success_msg", "ایمیل حاوی لینک با موفقیت ارسال شد");

  res.render("forgetPass", {
    pageTitle: "فراموشی رمز عبور",
    path: "/login",
    message: req.flash("success_msg"),
    error: req.flash("error"),
  });
};
