const captcha = require("captchapng");

const { schema } = require("../validation/contact");
const { sendEmail } = require("../utils/mailer");

let CAPTCHA_NUM;

exports.get = (req, res) => {
  res.render("contact", {
    pageTitle: "تماس با ما",
    path: "/contact",
    message: req.flash("success_msg"),
    error: req.flash("error"),
    errors: [],
  });
};

exports.post = async (req, res) => {
  const errorArr = [];

  const { fullname, email, message, captcha } = req.body;

  try {
    await schema.validate(req.body, { abortEarly: false });

    if (+captcha === CAPTCHA_NUM) {
      sendEmail(
        email,
        fullname,
        "پیام از طرف وبلاگ",
        `${message} <br/> ایمیل کاربر : ${email}`
      );

      req.flash("success_msg", "پیام شما با موفقیت ارسال شد");
    } else req.flash("error", "کد امنیتی درست نمیباشد.");

    res.render("contact", {
      pageTitle: "تماس با ما",
      path: "/contact",
      message: req.flash("success_msg"),
      error: req.flash("error"),
      errors: errorArr,
    });
  } catch (err) {
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message,
      });
    });
    res.render("contact", {
      pageTitle: "تماس با ما",
      path: "/contact",
      message: req.flash("success_msg"),
      error: req.flash("error"),
      errors: errorArr,
    });
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
