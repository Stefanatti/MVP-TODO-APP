const Todos = require("../modules/todoModule");

const getTodo = async (req, res) => {
  try {
    let todos = await Todos.find({ owner: req.params.id }).populate("owner");
    res.send(todos);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

const addTodo = (req, res) => {
  let newTodo = new Todos(req.body);
  newTodo.save();
  res.send({ message: "inserted " });
};

const updateTodo = async (req, res) => {
  await Todos.updateOne({ _id: req.params.id }, { todo: req.body.todo });
  res.send({ message: "todo updated" });
};

const deleteTodo = async (req, res) => {
  await Todos.deleteOne({ _id: req.params.id });
  res.send({ message: "todo deleted" });
};

const completeTodo = async (req, res) => {
  const todo = await Todos.findOne({ _id: req.params.id });
  todo.complete = !todo.complete;
  todo.save();
  res.send(todo);
};

module.exports = {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
};
