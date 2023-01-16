import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenFancy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UpdateTodo from "./UpdateTodo";

const ToDo = ({
  todo,
  index,
  markTodo,
  removeTodo,
  setUpdateData,
  editTodo,
}) => {
  return (
    <React.Fragment>
      <div>
        <div className="col todo-item">
          <div className="todo-Num-title">
            <div className={todo.status ? "complete" : ""}>
              <span className="todoNum">{index + 1}</span>
              <span className="todoTitle">{todo.title}</span>
            </div>
          </div>
          <div className="col-auto todo-btns ">
            <button
              className=" todoBtn"
              onClick={(e) => {
                markTodo(todo.title);
              }}
            >
              <span>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            </button>
            <button
              className=" todoBtn"
              onClick={() => {
                removeTodo(todo.title);
              }}
            >
              <span>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </button>
            <button
              className=" todoBtn"
              onClick={() => {
                setUpdateData({
                  id: todo.id,
                  title: todo.title,
                  status: todo.status ? true : false,
                });
              }}
            >
              <span>
                <FontAwesomeIcon icon={faPenFancy} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ToDo;
