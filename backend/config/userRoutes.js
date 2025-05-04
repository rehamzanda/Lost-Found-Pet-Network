// define auth for middleware
// it makes us know if user is log in or not
const userAuth = require("../auth/auth")

// define user controller
const userController = require("../Controller/userController") 

// bring API from .env
require("dotenv/config");
const api = process.env.API_URL;

// define express in our app
const express = require("express");

//define router
const router = express.Router();

// routes
// get all users
router.get(`${api}`, userAuth.isLogIn, userController.getAllUsers);

//get one user
router.get(`${api}:userId`, userController.getOneUser);

// Signup route
router.post("/signup", userController.signUp);

// login route
router.post(`/login`, userController.logIn);

// logout route
router.post(`${api}logout`, userController.logout)

module.exports = router;
