const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { get500 } = require("../errors");

exports.post = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "ایمیل یا رمز عبور اشتباه است." });

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass)
      return res.status(400).json({ message: "ایمیل یا رمز عبور اشتباه است." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({ token });
  } catch (error) {
    get500(req, res, error);
  }
};
