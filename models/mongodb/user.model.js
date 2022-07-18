//importing mongoose
const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  Firstname: { type: String, required: true },
  Lastname: { type: String, required: true },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  CreateAt: { type: Date },
});

let User = mongoose.model("User", userSchema);


module.exports.User = User;
