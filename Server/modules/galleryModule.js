const mongoose = require("./connection");

const GallerySchema = new mongoose.Schema({
  imageUrl: String,
  userId: String,
});

const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = Gallery;
