const captcha = require("captchapng");

const { schema } = require("../validation/contact");
const { sendEmail } = require("../utils/mailer");

let CAPTCHA_NUM;

exports.post = async (req, res) => {
  const errorArr = [];

  const { fullname, email, message } = req.body;

  try {
    await schema.validate(req.body, { abortEarly: false });

    sendEmail(
      email,
      fullname,
      "پیام از طرف وبلاگ",
      `${message} <br/> ایمیل کاربر : ${email}`
    );

    req.flash("success_msg", "پیام شما با موفقیت ارسال شد");

    res.status(200).json({ message: "پیام شما با موفقیت ارسال شد" });
  } catch (err) {
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message,
      });
    });
    res.status(422).json({ error: errorArr });
  }
};

exports.getCaptcha = (req, res) => {
  CAPTCHA_NUM = parseInt(Math.random() * 9000 + 1000);
  const p = new captcha(80, 30, CAPTCHA_NUM);
  p.color(0, 0, 0, 0);
  p.color(80, 80, 80, 255);

  const img = p.getBase64();
  const imgBase64 = Buffer.from(img, "base64");

  res.send(imgBase64);
};
