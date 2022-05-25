const passport = require("passport");
const axios = require("axios");

const { get500 } = require("../errors");

exports.post = async (req, res, next) => {
  try {
    passport.authenticate("local", {
      // successRedirect: "/dashboard",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
  } catch (error) {
    get500(req, res, error);
  }
};
