const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.authenticated = async (req, res, next) => {
  try {
    let token = req.get("Authorization") || "";
    token = token.split(" ")[1]; //Bearer Token

    if (!token) return res.status(403).send({ message: "دسترسی ندارید" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return res.status(403).send({ message: "دسترسی ندارید" });

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) return res.status(403).send({ message: "دسترسی ندارید" });

    req.user = user;
    next();
  } catch (error) {
    return helpers.res.serErr(res, error);
  }
};
