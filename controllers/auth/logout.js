const { get500 } = require("../errors");

exports.get = (req, res) => {
  try {
    req.session = null;
    req.logout();

    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );

    res.redirect("/auth/login");
  } catch (error) {
    get500(req, res, error);
  }
};
