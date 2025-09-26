
const jwt = require("jsonwebtoken");
const logout = async (req, res) => {
const token = req.cookies.token;

  if (!token) {
    // if no token, redirect to login page, as it means there is no user.
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, "SeCeReTkEy"); // same secret used when signing, to verify the user
    const f_name = decoded.f_name; // get first name from token, to print in the logout page

    res.render("logout", { name: f_name }); // pass as 'name' to view
  } catch (err) {
    console.error(err);
    res.redirect("/login"); // if token invalid, redirect to login
  }
};
module.exports = logout;
