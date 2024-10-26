// const session = require("express-session");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");





const securepassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.error(error.message);
  }
};

//    first get registration form
const loadRegister = async (req, res) => {
  try {
    res.render("signUp");
  } catch (error) {
    console.log(error);
  }
};
//   registration post for get data
const regRoute = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const spassword = await securepassword(password);
   
    const user = new User({
      name,
      email,
      password: spassword,
      is_admin: 0,
      
    });

    const userData = await user.save();

    if (userData) {
      res.redirect("/loginLoad");
    } else {
      res.render("signUp", { message: "try again!!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
};

// login route

const Login = async (req, res) => {
  try {
    console.log("hello, this is login route");
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

// login password gettin

const login_data = async (req, res) => {
  try {
   
     const {login_email,login_password}=req.body
      let userdata = await User.findOne({ email: login_email });
      
    if (userdata) {
      const passwordMatch = await bcrypt.compare(login_password, userdata.password);
      console.log(passwordMatch);

      if (passwordMatch && userdata.is_admin===0 ) {
        
          
         
        req.session.user_id = userdata._id;

        res.redirect("/home");
      } else {
        res.render("login", { message: "Incorrect email or password" });
      }
    } else {
      res.render("login", { message: "Incorrect email or password" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");

  }
};

// const data = async (req,res)=>{
//     try{

//         console.log('heloo it data route');
//            console.log( req.body.login_email)
//            console.log(req.body.login_password)

//     }catch(err){
//         console.log(err);
//     }
// }

const loadHome = async (req, res) => {
  try {
  
    
    
    const userdata = await User.findById(req.session.user_id)

    console.log(userdata.name);
    
    if (userdata) {

        res.render("home", { logindataFromDatabase: userdata });
  
      } else {
  
        res.redirect("/login");
  
      }
   
    
  } catch (error) {
    console.log(error.message);  
    
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/loginLoad");
  } catch (error) {
    console.log(error.message);
  }
};

const edit = async (req, res) => {
  try {
    const id = req.query._id;
    const userdata = await User.findOne({ _id: id });

    res.render("edit", { user_data: userdata });

    if (userdata) {
      console.log(userdata);
    } else {
      console.log("no data");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const update = async (req, res) => {
  try {
    const { update_name, update_email, update_password, update_id } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      update_id, // Filter: Finds the user by _id
      { $set: { name: update_name, email: update_email } } // Update: Sets new values for name and email
    );


    if (updatedUser) {

        console.log("User updated successfully");
  
        res.redirect("/home");
  
      } else {
  
        res.status(404).send("User not found");
  
      }







    // console.log("User updated successfully:");
    // res.redirect("/home");

    // const ogdata = await User.findById({ _id: update_id });
    // console.log(ogdata);

    // const fulldata = await User.findOne({ email: update_email });

    // if (fulldata) {
    //     console.log("email.allready exsit type a new e mail ");
    //     res.render("edit", { a: 1 });
    //     // res.redirect("/edit")

    //   }else if(update_name !== ogdata.name && update_email !== ogdata.email) { //data chaging in

    //

    //

    // } else {
    //   res.render("edit", { a:2});
    // }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadRegister,
  regRoute,
  Login,
  login_data,
  loadHome,
  logout,
  edit,
  update,
};
