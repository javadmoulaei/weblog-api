const User = require("../../models/User");
const { get500 } = require("../errors");
const { sendEmail } = require("../../utils/mailer");

exports.get = (req, res) => {
  try {
    res.render("register", {
      pageTitle: "ثبت نام",
      path: "/register",
    });
  } catch (error) {
    get500(req, res, error);
  }
};

exports.post = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      errors.push({ message: "کاربری با این ایمیل ثبت نام کرده است." });

      return res.render("register", {
        pageTitle: "ثبت نام",
        path: "/register",
        errors,
      });
    }

    await User.create({ email, fullname, password });

    req.flash("success_msg", "ثبت نام با موفقیت انجام شد.");

    await sendEmail(email, fullname, "ثبت نام موفق", "به وبلاگ ما خوش آمدی");

    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);

    error.inner.forEach((element) => {
      errors.push({
        name: element.path,
        message: element.message,
      });
    });

    return res.render("register", {
      pageTitle: "ثبت نام",
      path: "/register",
      errors,
    });
  }
};
