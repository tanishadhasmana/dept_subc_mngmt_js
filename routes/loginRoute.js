
const express = require("express");
const router = express.Router();
const { showLogin, loginUser } = require("../controllers/loginController");

router.get("/", showLogin);
router.post("/", loginUser);

module.exports = router;
