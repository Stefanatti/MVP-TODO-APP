const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
const todoRouter = require("./routers/todoRoute");
const userRouter = require("./routers/userRoute");

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.listen(3636, () => {
  console.log("App is running on the port", 3636);
});
