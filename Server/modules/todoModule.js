const mongoose = require("./connection");

const TodosSchema = new mongoose.Schema({
  todo: String,
});

const Todos = mongoose.model("Todos", TodosSchema);

module.exports = Todos;
