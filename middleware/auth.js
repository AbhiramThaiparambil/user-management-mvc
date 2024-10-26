const session = require("express-session");

//middle ware
const isLogin = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      next();
      console.log("working");
    } else {
      res.redirect("/loginLoad");
      console.log("working5");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (!req.session.user_id) {
      next();
      console.log("hello");
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  isLogin,
  isLogout,
};
