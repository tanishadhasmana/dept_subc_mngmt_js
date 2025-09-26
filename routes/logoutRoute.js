

const express = require("express");
const router = express.Router();
const logout = require("../controllers/logoutController");

// http://localhost:3005/logout as till yet, we got at from the app.js, 
router.get("/", logout);
module.exports = router;
