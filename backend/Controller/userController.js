// define user schema
const User = require("../models/User");

// define bcrypt
const bcrypt = require("bcryptjs");

// define jsonwebtoken
const jwt = require("jsonwebtoken");

require("dotenv/config");

// bring API from .env
require("dotenv/config");
const api = process.env.API_URL;

getAllUsers = (req, res) => {
  User.find()
    // .select("-password") // we use select to hide a user password
    .then((users) => {
      if (users.length > 0) {
        res.send(users);
      } else {
        res.send("Thereare no users yet !");
      }
    })
    .catch((err) => res.send(err));
};

getOneUser = (req, res) => {
  User.findById(req.params.userId)
    .select("-password") // we use select to hide a user password
    .then((user) => {
      res.send(user);
    })
    .catch((err) => res.send(err));
};

signUp = (req, res) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;

  const { email, password, userName, phoneNumber } = req.body;

  // Email validate
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format.");
  }

  // Phonenumber validate
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).send("Invalid phone number format.");
  }

  // Password validate
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .send(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
  }

  // Email or user name is exist
  User.findOne({
    $or: [{ email: email }, { userName: new RegExp(`^${userName}$`, "i") }],
  })
    .then((existingUser) => {
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).send("This email is already in use.");
        } else {
          return res.status(400).send("This username is already in use.");
        }
      }

      // create a new user
      const user = new User({
        email: email,
        password: bcrypt.hashSync(password, 10),
        userName: userName,
        phoneNumber: phoneNumber,
      });

      user
        .save()
        .then((result) => res.status(201).send(result))
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
};

logIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            user: user,
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );

        console.log({ email: user.email, token: token });
        res.cookie("token", token);

        res.send({
          message: "Login successful",
          token: token,
        });
      } else {
        res.status(500).send("Email or Password is wrong !!");
      }
    })
    .catch((err) => console.log(err));
};

logout = (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Logged out" });
};

module.exports = {
  getAllUsers,
  getOneUser,
  signUp,
  logIn,
  logout,
};
