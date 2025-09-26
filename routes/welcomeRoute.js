
const express = require("express");
const router = express.Router();
const welcome = require("../controllers/welcomeController");

router.get("/", welcome);

module.exports = router;
