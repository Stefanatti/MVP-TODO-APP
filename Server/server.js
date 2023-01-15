const express = require("express");
const app = express();
const User = require("./modules/userModule");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
var jwt = require("jsonwebtoken");
const Gallery = require("./modules/galleryModule");

app.post("/signup", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ id: user._id }, "secret");
        res.send({ token });
      } else {
        res.send({ message: "Wrong password " });
      }
    });
  } else {
    res.send({ message: "Wrong username" });
  }
});

app.post("/verify", async (req, res) => {
  jwt.verify(req.body.token, "secret", async (err, payload) => {
    if (payload) {
      let user = await User.findOne({ _id: payload.id });
      res.send(user);
    } else {
      res.send({ message: "Session expired" });
    }
  });
});

app.post("/image", async (req, res) => {
  let newImage = new Gallery({
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
  });
  await newImage.save();
  res.send({ message: true });
});

app.get("/image/:id", async (req, res) => {
  let images = await Gallery.find({ userId: req.params.id });
  res.send({ list: images });
});

app.delete("/image/:id", async (req, res) => {
  await Gallery.delete({ _id: req.params.id });
  res.send({ message: true });
});

app.listen(3636, () => {
  console.log("App is running on the port", 3636);
});
