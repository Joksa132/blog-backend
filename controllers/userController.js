const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

exports.register = [
  body("username", "Username required")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("password", "Password required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("firstName", "First name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Last name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        throw new Error("Username already exists");
      }

      const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      await user.save()
      console.log("User successfully registered")
      res.json()
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: e.message });
    }
  }
]

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) {
      throw new Error("Incorrect password")
    }

    console.log("Correct password")
    const token = jwt.sign({
      userId: user._id,
      userName: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    }, process.env.secret_key, { expiresIn: "1 day" })
    return res.status(200).json({
      message: "Auth Passed",
      userInfo: {
        Id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token
    })
  } catch (e) {
    console.log("Error", e)
    res.status(401).json({ message: e.message });
  }
}

exports.info = (req, res) => {
  res.json(req.user)
}