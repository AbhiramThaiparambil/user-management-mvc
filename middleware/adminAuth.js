const isLogin = async (req, res, next) => {
  try {
    if (req.session.admin_id) {
      next();
      console.log("working");
    } else {
      res.redirect("/adminlogin1");
      console.log("working5");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (!req.session || !req.session.admin_id) {
      console.log("User is logged out");
      next();
    } else {
      console.log("User already logged in, redirecting to home");
      res.redirect("/Adminhome");
    }
  } catch (error) {
    console.error("Error in isLogout middleware:", error.message);
    next(error); // Pass the error to the next middleware
  }
};

module.exports = {
  isLogin,
  isLogout,
};
