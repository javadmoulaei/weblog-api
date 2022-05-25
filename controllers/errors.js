exports.get404 = (req, res) => {
  res
    .status(404)
    .render("errors/404", { pageTitle: "صفحه یافت نشد", path: "/404" });
};

exports.get500 = (req, res, error) => {
  if (process.env.NODE_ENV == "development") console.log(error);
  res
    .status(500)
    .render("errors/500", { pageTitle: "خطای سرور", path: "/500" });
};
