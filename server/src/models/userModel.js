const mongoose = require("mongoose");

// MongoDB schema and model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  profileImageUrl: { type: String }, // Store S3 image URL here
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
