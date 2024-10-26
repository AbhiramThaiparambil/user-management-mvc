const session = require("express-session");
const Admin = require("../model/AdminModel");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const { LEGAL_TLS_SOCKET_OPTIONS, ServerApiVersion } = require("mongodb");
const { render } = require("ejs");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.error(error.message);
  }
};

const adminLoginLoad  = async (req,res)=>{
  try {
    res.render('AdminLogin')
  } catch (error) {
     console.log(error.message);
  }
}

const regdata = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await securePassword(password);

    const newAdmin = new User({
      name: name,
      email: email,
      password: hashedPassword,
      is_admin: 1,
    });

    const userData = await newAdmin.save();

    if (userData) {
      res.redirect("/");
    } else {
      res.send("try againe");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { login_email, login_password } = req.body;
    console.log(login_email);

    const userFulldata = await User.findOne({ email: login_email });
    req.session.admin_id= userFulldata._id;
    console.log(userFulldata);
    console.log(userFulldata.is_admin);

    if (userFulldata) {
      const passwordMatch = await bcrypt.compare(
        login_password,
        userFulldata.password
      );

      if (passwordMatch) {
        if (userFulldata.is_admin === 1) {
          res.redirect("/Adminhome");
        } else {
          res.render("login", { message:"your are not a admin" });
        }
      } else {
        res.render("login", { message: "email or password is worng" });
      }
    }
  } catch (error) {
    console.log(console.error(error.message));
  }
};

const adminhome = async (req, res) => {
  try {
    const userdata = await User.findOne({ _id: req.session.admin_id });
    console.log(userdata);

    res.render("AdminHome", { userdata: userdata });
  } catch (error) {
    console.error(error.message);
  }
};

const edit = async (req, res) => {
  try {
    

    const fulldata_users = await User.find({ });

    if (!fulldata_users.length) {
      return res.status(404).render("AdminEdit", { user: fulldata_users });
    }
    res.render("AdminEdit", { user: fulldata_users });
  } catch (error) {
    console.error(error.message);
  }
};

const adminhome2 = async (req, res) => {
  try {
    const userdata = await User.findOne({ _id:req.session.admin_id });
    console.log(userdata);

    res.render("AdminHome", { userdata: userdata });
  } catch (error) {
    console.error(error.message);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.error(error.message);
  }
};

const newuser = async (req, res) => {
  try {
    res.render("AdminNew-userAdd");
  } catch (error) {
    console.log(error.message);
  }
};

const addnewUserData = async (req, res) => {
  try {
    const { nUser_name, nUser_email, nUser_password } = req.body;

    // Assuming securePassword is a function that hashes the password
    const nUserSPassword = await securePassword(nUser_password);

    // Creating a new instance of User
    const newUser = new User({
      name: nUser_name,
      email: nUser_email,
      password: nUserSPassword,
      is_admin: 0,
    });

    // Saving the new user to the database
    const userData = await newUser.save();

    if (userData) {
      res.redirect("/AdminEdit");
    } else {
      console.log("Failed to save the user. Please try again.");
      res.status(500).send("Failed to save the user. Please try again.");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("An error occurred while saving the user data.");
  }
};

const useredit = async (req, res) => {
  try {
    let _id = req.query._id;
    let ogUsrdata = await User.findById({ _id: _id });
    console.log(ogUsrdata);

    res.render("AdminUserEdit", { userData: ogUsrdata });
  } catch (error) {
    console.log(error.message);
  }
};

const editedata = async (req, res) => {
  try {
    let { updatedname, updatedemail, updatepassword, admin, id } = req.body;

    admin = admin === "1" ? 1 : 0;

    console.log(`${updatedname}, ${updatedemail}, ${updatepassword}, ${admin}`);

    let updateFields = {
      name: updatedname,
      email: updatedemail,
      is_admin: admin,
    };

    if (updatepassword) {
      updateFields.password = updatepassword;
    }

    const updated = await User.findByIdAndUpdate(
      { _id: id },
      { $set: updateFields },
      { new: true }
    );

    console.log(updated);

    if (updated) {
      res.redirect("/AdminEdit");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteuser = async (req, res) => {
  try {
    const userDelete = await User.deleteOne({ _id: req.query._id });
    if (userDelete) {
      res.redirect("/AdminEdit");
    } else {
    }
  } catch (error) {
    console.log(error.message);
  }
};

const adminSignup = async (req,res)=>{
  try {
    res.render('AdminSignUp')
    
  }catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  adminLoginLoad,
  regdata,
  adminLogin,
  adminhome,
  adminhome2,
  logout,
  edit,
  newuser,
  addnewUserData,
  useredit,
  editedata,
  deleteuser,
  adminSignup
};
