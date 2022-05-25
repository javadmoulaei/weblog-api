const yup = require("yup");

exports.schema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان الزامی می باشد")
    .min(5, "عنوان نباید کمتر از 5 کاراکتر باشد")
    .max(100, "عنوان نباید بیشتر از 100 کاراکتر باشد"),
  body: yup.string().required("محتوا الزامی می باشد"),
  status: yup.mixed().oneOf(["public", "private"], "وضعیت نامعتبر"),
  thumbnail: yup.object().shape({
    name: yup.string().required("عکس بند انگشتی الزامی میباشد"),
    size: yup.string().max(3000000, "عکس نباید بیشتر از ۳ مگابایت باشد"),
    mimetype: yup
      .mixed()
      .oneOf(
        ["image/jpeg", "image/png"],
        "تنها پسوندهای png و jpeg پشتیبانی میشوند."
      ),
  }),
});
