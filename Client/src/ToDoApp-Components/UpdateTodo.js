const UpdateTodo = ({ updateData, updateTodo, cancelUpdate }) => {
  return (
    <div>
      <div className="row">
        <div className=" col updateTodo">
          <input
            className="updateInput form-control form-control-lg"
            type="text"
            value={updateData}
            onChange={(e) => {
              e.target.value;
            }}
          />
          <button
            className="updateBtn btn btn-warning"
            onClick={() => {
              updateTodo();
            }}
          >
            Update
          </button>
          <button
            className="cancelBtn btn btn-warning"
            onClick={() => {
              cancelUpdate();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
