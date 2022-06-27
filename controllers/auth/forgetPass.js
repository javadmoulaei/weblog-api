const jwt = require("jsonwebtoken");

const User = require("../../models/User");

exports.post = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(400).send({ message: "کاربری با این ایمیل یافت نشد" });

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

    res.send({ message: "ایمیل بازیابی ارسال شد" });
  } catch (error) {
    res.status(500).send({ message: "ارور از سمت سرور" });
  }
};
