const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signupController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exists",
      });
    }

    const newUser = new userModel();
    newUser.username = username;
    newUser.email = email;

    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();
    console.log(newUser);

    res.status(200).json({
      successMessage: "Registration success. Please signin.",
    });
  } catch (err) {
    console.log("signupController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid credentials",
      });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(payload, process.env.jwtSecret, (err, token) => {
      if (err) console.log("jwt error: ", err);
      const { _id, username, email, role } = user;

      res.json({
        token,
        user: { _id, username, email, role },
      });
    });
  } catch (err) {
    console.log("signinController error: ", err);
    res.status(500).json({
      errorMessage: "Server error",
    });
  }
};
