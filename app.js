const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const homeRoute = require("./routes/homeRoute");
const loginRoute = require("./routes/loginRoute");
const welcomeRoute = require('./routes/welcomeRoute');
const logoutRoute = require("./routes/logoutRoute");

const app = express();
const PORT = process.env.PORT || 3005;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/", homeRoute);
app.use("/login", loginRoute);
app.use("/welcome", welcomeRoute);
app.use("/logout", logoutRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
