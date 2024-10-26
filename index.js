const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./router/userRouter");
const adminRoute = require("./router/adminRouter");
const nocache = require("nocache");
const { log } = require("console");

mongoose.connect("mongodb://localhost:27017/userdata_week06");

// public serving
app.use(express.static("public"));

//  route for users
app.use(nocache());

app.use("/", userRoute.userRoute);
app.use("/", adminRoute.adminRoute);

// server Port
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
