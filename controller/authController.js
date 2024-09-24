const User = require("../model/user");
const jwt = require("jsonwebtoken");

const handleError = (err) => {
  let errors = { name: "", email: "", password: "", username: "" };

  if(err.message === "Incorrect email") {
    errors.message = "That email"
  }
};
