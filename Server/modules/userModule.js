const mongoose = require("../modules/connection");
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  imageUrl: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
// we can use module.exports ,its the same.
