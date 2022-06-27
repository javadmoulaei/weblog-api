const { Router } = require("express");

const login = require("../controllers/auth/login");
const register = require("../controllers/auth/register");
const logout = require("../controllers/auth/logout");
const forgetPass = require("../controllers/auth/forgetPass");
const resetPass = require("../controllers/auth/resetPass");

const { authenticated } = require("../middleware/auth");

const router = new Router();

router.post("/login", login.post);

router.post("/register", register.post);

router.post("/forget-password", forgetPass.post);

router.post("/reset-password/:id", resetPass.post);

router.get("/logout", authenticated, logout.get);

module.exports = router;
