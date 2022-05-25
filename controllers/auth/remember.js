exports.post = (req, res) => {
  if (req.body.remeber) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 1 day
  } else {
    req.session.cookie.expire = null;
  }

  return res.redirect("/dashboard");
};
