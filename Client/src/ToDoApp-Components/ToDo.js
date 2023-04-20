import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenFancy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ToDo = ({
  todo,
  index,
  markTodo,
  deleteTodo,
  setUpdateData,
  setUpdateId,
  setUpdateForm,
}) => {
  return (
    <div key={todo._id}>
      <div className="col todo-item">
        <div className="todo-Num-title">
          <div className={todo.complete ? "complete" : ""}>
            <span className="todoNum">{index + 1}</span>
            <span className="todoTitle">{todo.todo}</span>
          </div>
        </div>
        <div className="col-auto todo-btns ">
          <button
            className=" todoBtn"
            onClick={() => {
              markTodo(todo._id);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faCircleCheck} />
            </span>
          </button>
          <button
            className=" todoBtn"
            onClick={() => {
              deleteTodo(todo._id);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </button>
          <button
            className=" todoBtn"
            onClick={() => {
              setUpdateId(todo._id);
              setUpdateData(todo.todo);
              setUpdateForm(true);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faPenFancy} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
