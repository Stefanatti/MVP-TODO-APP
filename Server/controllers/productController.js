const Product = require("../modules/productModule");

const getProduct = async (req, res) => {
  var products = await Product.find({}).populate("owner");
  //console.log(products[0].owner.name);
  res.send(products);
};

const addProduct = (req, res) => {
  var newProduct = new Product(req.body);
  newProduct.save();
  res.send({ message: "inserted " });
};

const updateProduct = async (req, res) => {
  await Product.updateOne({ _id: req.params.id }, req.body);
  res.send({ message: "Product updated" });
};

const deleteProduct = async (req, res) => {
  await Product.deleteOne({ _id: req.params.id });
  res.send({ message: "Product deleted" });
};

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
