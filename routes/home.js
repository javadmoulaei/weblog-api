const { Router } = require("express");

const router = new Router();

const blog = require("../controllers/blog");
const contact = require("../controllers/contact");

router.get("/", blog.get);
router.get("/posts/:id", blog.getOne);

router.post("/contact", contact.post);

router.get("/captcha.png", contact.getCaptcha);

module.exports = router;
