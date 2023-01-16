const AddTodoForm = ({ todos, addTodo, newTodo, setNewTodo }) => {
  return (
    <form onSubmit={addTodo} className="todo-form">
      <div className="row">
        <div className="col ">
          <input
            className="form-control form-control-lg "
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder={todos && todos.length ? "" : "No to do tasks yet... "}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-success btn-lg">Add To Do</button>
        </div>
      </div>
    </form>
  );
};

export default AddTodoForm;
