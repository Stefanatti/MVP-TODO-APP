const mongoose = require("./connection");

const TodosSchema = new mongoose.Schema({
  todo: String,
  complete: {
    type: Boolean,
    default: false,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Todos = mongoose.model("Todos", TodosSchema);

module.exports = Todos;
