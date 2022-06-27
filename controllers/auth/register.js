const User = require("../../models/User");
const { get500 } = require("../errors");
const { sendEmail } = require("../../utils/mailer");

exports.post = async (req, res) => {
  try {
    await User.userValidation(req.body);
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .send({ message: "کاربری با این ایمیل ثبت نام کرده است" });

    await User.create({ email, fullname, password });

    await sendEmail(email, fullname, "ثبت نام موفق", "به وبلاگ ما خوش آمدی");

    return res.send({ message: "ثبت نام با موفقیت انجام شد" });
  } catch (error) {
    return res.send({
      error,
    });
  }
};
