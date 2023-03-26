const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const uri = process.env.MONGO_URI;
mongoose.set("strictQuery", false);

async function main() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => console.log(err));

module.exports = mongoose;
