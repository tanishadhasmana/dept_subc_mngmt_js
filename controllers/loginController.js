
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const showLogin = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
    
  const { f_name, l_name, email, phone_no, user_status, password } = req.body;

  try {
    const user = await db("users").where({ email }).first();

    if (user) {
      // user exists → check password
      const match = await bcrypt.compare(password, user.password || " ");
      if (!match) {
         // if no password was set before, update it now
        if (!user.password) {
          const hashedPass = await bcrypt.hash(password, 10);
          await db("users").where({ email }).update({ password: hashedPass });
          console.log("Password added for existing user:", f_name);
        } else {
          return res.send("Wrong password!");
        }
      }

      // password matched → create token
      const token = jwt.sign(
        { id: user.id, f_name: user.f_name, email: user.email },
        "SeCeReTkEy",
        { expiresIn: "1h" }
        // "30s" → 30 seconds
        // "15m" → 15 minutes
        // "7d" → 7 days
        // 60*60 → 3600 seconds (1 hour)
      );
      res.cookie("token", token);
      return res.redirect("/welcome");
    }

    // new user → create hashed password
    const hashedPass = await bcrypt.hash(password, 10);

    const [newUserId] = await db("users").insert({
      f_name,
      l_name,
      email,
      phone_no,
      user_status,
      password: hashedPass
    });

    const token = jwt.sign(
      { id: newUserId, f_name, email },
      "your_secret_key",
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    res.redirect("/");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { showLogin, loginUser };
