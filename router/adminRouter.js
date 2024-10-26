const express = require("express");
const adminRoute = express();
const nocache = require("nocache");
const session = require("express-session");
const bodyParser = require("body-parser");
const admin_Controller = require("../controller/admin_controller");
const auth = require("../middleware/adminAuth");

adminRoute.use(nocache()); // Apply nocache middleware globally
adminRoute.set("view engine", "ejs");
adminRoute.set("views", "./views/user");

adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({ extended: true }));

adminRoute.use(
  session({
    secret: "mysitesecretcode",
    resave: true,
    saveUninitialized: false,
  })
);

// Route definitions
adminRoute.get("/adminSignup", auth.isLogout, admin_Controller.adminSignup);
adminRoute.post("/adminreg", auth.isLogout, admin_Controller.regdata);
adminRoute.get("/newuser", auth.isLogin, admin_Controller.newuser);

adminRoute.get("/adminLogin1", auth.isLogout, admin_Controller.adminLoginLoad);
adminRoute.post("/adminlogin", admin_Controller.adminLogin);

adminRoute.get("/Adminhome", admin_Controller.adminhome);
adminRoute.get("/AdminEdit", admin_Controller.edit);
adminRoute.get("/Adminhome2", admin_Controller.adminhome2);
adminRoute.get("/logoutAdmin", admin_Controller.logout);

adminRoute.post(
  "/addNewuserdata",
  auth.isLogin,
  admin_Controller.addnewUserData
);
adminRoute.get("/Useredit", auth.isLogin, admin_Controller.useredit);
adminRoute.post("/editedData", auth.isLogin, admin_Controller.editedata);
adminRoute.get("/deletUser", auth.isLogin, admin_Controller.deleteuser);

module.exports = {
  adminRoute,
};
