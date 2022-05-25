const yup = require("yup");

exports.schema = yup.object().shape({
  fullname: yup
    .string()
    .required("نام و نام خانوادگی الزامی می باشد")
    .min(4, "نام و نام خانوادگی نباید کمتر از 4 کاراکتر باشد")
    .max(255, "نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد"),
  email: yup
    .string()
    .email("ایمیل معتبر نمی باشد")
    .required("ایمیل الزامی می باشد"),
  password: yup
    .string()
    .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
    .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
    .required("کلمه عبور الزامی می باشد"),
  confirmPassword: yup
    .string()
    .required("تکرار کلمه عبور الزامی می باشد")
    .oneOf([yup.ref("password"), null], "کلمه های عبور یکسان نیستند."),
});
