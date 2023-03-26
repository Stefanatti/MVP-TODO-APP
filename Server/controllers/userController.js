const User = require("../modules/userModule");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.send({ message: "Please send the needed data " });
  } else {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      res.send({ message: "User already exist " });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (hash) {
          let newUser = new User({
            username: req.body.username,
            password: hash,
          });
          await newUser.save();
          res.send({ message: true });
        } else {
          console.log(err);
          res.send({ message: false });
        }
      });
    }
  }
};

const login = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);
        res.send({ token });
      } else {
        res.send({ message: "Wrong password " });
      }
    });
  } else {
    res.send({ message: "Wrong username" });
  }
};

const verify = async (req, res) => {
  jwt.verify(req.body.token, process.env.TOKEN_KEY, async (err, payload) => {
    if (payload) {
      let user = await User.findOne({ _id: payload.id });
      res.send(user);
    } else {
      res.send({ message: "Session expired" });
    }
  });
};

module.exports = {
  signup,
  login,
  verify,
};
