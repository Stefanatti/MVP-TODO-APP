const mongoose = require("../modules/connection");
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
