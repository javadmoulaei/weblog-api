const jwt = require("jsonwebtoken");

const User = require("../../models/User");

exports.post = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { id } = req.params;

    const decodedToken = jwt.verify(id, process.env.JWT_SECRET);

    if (!decodedToken)
      return res.status(403).send({ message: "دسترسی ندارید" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .send({ message: "کلمه عبور با تایید کلمه عبور یکسان نیستند" });

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) return res.status(403).send({ message: "دسترسی ندارید" });

    user.password = password;
    await user.save();

    res.send({ message: "پسورد آپدیت شد" });
  } catch (error) {
    res.status(500).send({ message: "ارور از سمت سرور" });
  }
};
