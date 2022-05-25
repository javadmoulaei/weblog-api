const { Router } = require("express");

const login = require("../controllers/auth/login");
const register = require("../controllers/auth/register");
const logout = require("../controllers/auth/logout");
const remember = require("../controllers/auth/remember");
const forgetPass = require("../controllers/auth/forgetPass");
const resetPass = require("../controllers/auth/resetPass");

const { authenticated } = require("../middleware/auth");

const router = new Router();

router.get("/login", login.get);
router.post("/login", login.post, remember.post);

router.get("/register", register.get);
router.post("/register", register.post);

router.get("/forget-password", forgetPass.get);
router.post("/forget-password", forgetPass.post);

router.get("/reset-password/:token", resetPass.get);
router.post("/reset-password/:id", resetPass.post);

router.get("/logout", authenticated, logout.get);

module.exports = router;
