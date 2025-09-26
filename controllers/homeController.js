
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    // if the user's token is not exists, means user isn't exists
    return res.render("home", { name: null });
  }

  try {
    const decoded = jwt.verify(token, "ShhhhhhSeCeReT");
    res.render("home", { name: decoded.f_name });
  } catch (err) {
    res.render("home", { name: null });
  }
};
module.exports = home;
