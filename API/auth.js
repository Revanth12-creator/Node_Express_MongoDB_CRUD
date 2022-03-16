let express = require("express"),
  router = express.Router();
const bcrypt = require("bcryptjs");
let config = require("../config/index"),
  jwt = require("jsonwebtoken");

const ProfileSChema = require("../Model/profil.js");

// hashPassword
async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

// SignUp
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.json({
      success: false,
      msg: "Please pass username, email and password.",
    });
  } else {
    const pass = await hashPassword(password);

    let newUser = new ProfileSChema({
      username: username,
      email: email,
      password: pass,
    });
    // save the user
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
});

//SignIn
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await ProfileSChema.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "User Not found",
      });
    }

    const isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) {
      return res.status(400).json({
        message: "Invalid login details",
      });
    }
    let token = jwt.sign(user.toJSON(), config.secret);
    res.json({ success: true, token: "JWT " + token });
  } catch (err) {
    res.status(401).json({ mes: err });
  }
});
module.exports = router;
