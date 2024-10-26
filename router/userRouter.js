const express = require("express");
const userRoute = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const user_controller = require("../controller/user_controller");
const auth = require("../middleware/auth");

userRoute.use(
  session({
    secret: "mysitesecretcode",
    resave: true,
    saveUninitialized: false,
  })
);

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));
// setting ejs

userRoute.set("view engine", "ejs");
userRoute.set("views", "./views/user");

userRoute.get("/", auth.isLogout, user_controller.loadRegister); //showing first page
userRoute.post("/reg", auth.isLogout, user_controller.regRoute); //for get value from form
userRoute.get("/loginLoad", auth.isLogout, user_controller.Login);
userRoute.post("/login", auth.isLogout,user_controller.login_data);
// userRoute.post('/login',)
userRoute.get("/home", user_controller.loadHome);
userRoute.get("/logout", user_controller.logout);
userRoute.get("/edit", auth.isLogin, user_controller.edit);
userRoute.post('/update',user_controller.update)
module.exports = {
  userRoute,
};
