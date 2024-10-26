const mongoose = require("mongoose");

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Number,
    required: true,
  },
});

// Export the Admin model

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
