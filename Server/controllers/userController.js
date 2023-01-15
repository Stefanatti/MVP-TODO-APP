const User = require("../modules/userModule");

const getUser = async (req, res) => {
  var users = await User.find({});
  res.send(users);
};

const addUser = (req, res) => {
  var newUser = new User(req.body);
  newUser.save();
  res.send({ message: "inserted " });
};

const updateUser = async (req, res) => {
  await User.updateOne({ _id: req.params.id }, req.body);
  res.send({ message: "user updated" });
};

const deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id });
  res.send({ message: "user deleted" });
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
