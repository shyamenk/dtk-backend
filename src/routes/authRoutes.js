const express = require("express");
const bcrypt = require("bcrypt");
const { compare } = require("bcrypt");

const User = require("../models/User");
const { verifyToken } = require("../controllers/authController");
const { sign } = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  console.log("Hello");
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const validPassword = compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = sign({ email, role: user.role }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

authRouter.get("/", verifyToken, (req, res) => {
  res.json({ message: "You have access to this protected route!" });
});

module.exports = authRouter;
