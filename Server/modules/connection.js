const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://stefanatti-13:Ananas@cluster0.sghhmsy.mongodb.net/?retryWrites=true&w=majority"
  );
}

module.exports = mongoose;
