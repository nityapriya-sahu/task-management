const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//SIGN IN APIs
router.post("/sign-in", async (req, res) => {
  try {
    const { username } = req.body;
    const { email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should have atleast 4 characters" });
    }
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //bcrypt the password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    //   create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "SignIn Successfully" });
  } catch (error) {
    //optimize error handling
    // console.log("========================>>>>");
    // if (error.message.includes("E11000")) {
    //   return res.status(400).json({ message: "SignIn Failed" });
    // }
    // console.log(error);
    // console.log("<<<<========================");
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
});

//LOG IN APIs
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  //Compare the password (user password and which is store is DB)
  bcrypt.compare(password, existingUser.password, (err, data) => {
    if (data) {
      //remember it's a syntax
      const authClaims = [{ name: username }, { jti: jwt.sign({}, "nitya") }];
      const token = jwt.sign({ authClaims }, "nitya", { expiresIn: "2d" });
      res.status(200).json({ id: existingUser._id, token: token });
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  });
});
module.exports = router;
