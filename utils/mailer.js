const nodeMailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporterDetails = smtpTransport({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const transport = nodeMailer.createTransport(transporterDetails);

exports.sendEmail = async (to, fullname, subject, message) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to,
      subject,
      html: `<h1> سلام ${fullname}</h1>
            <p>${message}</p>`,
    },
    (err, info) => {
      if (err) return false;
      return true;
    }
  );
};
