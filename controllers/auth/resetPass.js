const jwt = require("jsonwebtoken");

const User = require("../../models/User");

exports.get = async (req, res) => {
  const token = req.params.token;

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (!decodedToken) {
      return res.redirect("/404");
    }
  }

  res.render("resetPass", {
    pageTitle: "تغییر پسورد",
    path: "/login",
    message: req.flash("success_msg"),
    error: req.flash("error"),
    userId: decodedToken.userId,
  });
};

exports.post = async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    req.flash("error", "کلمه های عبور یاکسان نیستند");

    return res.render("resetPass", {
      pageTitle: "تغییر پسورد",
      path: "/login",
      message: req.flash("success_msg"),
      error: req.flash("error"),
      userId: req.params.id,
    });
  }

  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return res.redirect("/404");
  }

  user.password = password;
  await user.save();

  req.flash("success_msg", "پسورد شما با موفقیت بروزرسانی شد");
  res.redirect("/auth/login");
};
