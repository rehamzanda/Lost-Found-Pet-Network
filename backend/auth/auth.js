isLogIn = (req, res, next) => {

  if (req.cookies.token) {
    next();
  } else {
    res.send({message : "Sign in first"});
  }
};

module.exports = {
  isLogIn,
};

// user can not reach the log in page or sign up page if he is logged in