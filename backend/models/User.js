// define mongoose
const mongoose = require("mongoose");

// create user schema
const userSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  });
  
  // send schema to database
  const User = mongoose.model("user", userSchema);
  
  module.exports =  User