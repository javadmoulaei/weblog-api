const express = require("express");
const { authenticated } = require("../middleware/auth");
const app = express();
const router = express.Router();

router.use("/", require("./home"));
router.use("/dashboard", authenticated, require("./dashboard"));
router.use("/auth", require("./auth"));

module.exports = router;
