const yup = require("yup");

exports.schema = yup.object().shape({
  fullname: yup.string().required("نام و نام خانوادگی الزامی می باشد"),
  email: yup
    .string()
    .email("آدرس ایمیل صحیح نیست")
    .required("آدرس ایمیل الزامی می باشد"),
  message: yup.string().required("پیام اصلی الزامی می باشد"),
});
