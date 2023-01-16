import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoApp.css";
import AddTodoForm from "./ToDoApp-Components/AddTodoForm";
import UpdateTodo from "./ToDoApp-Components/UpdateTodo";
//import ToDo from "./ToDoApp-Components/ToDo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPenFancy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ToDoApp = () => {
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updateForm, setUpdateForm] = useState(false);

  const [updateData, setUpdateData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          setUser(data);
        });
    }
  }, [user]);

  useEffect(() => {
    axios
      .get("http://localhost:3636/todo/")
      .then(({ data }) => {
        setTodos(data);
      })
      .catch((err) => console.error("Error:", err));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo) {
      axios.post("http://localhost:3636/todo/", {
        todo: newTodo,
        owner: user._id,
      });
      setNewTodo("");
    } else {
      alert("Please write something you are planing to do.");
    }
  };

  const deleteTodo = async (id) => {
    const data = await fetch("http://localhost:3636/todo/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error:", err));

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const updateTodo = async (id) => {
    axios
      .put("http://localhost:3636/todo/" + id, {
        todo: newTodo,
      })
      .catch((err) => console.error("Error:", err));
    setNewTodo("");
  };

  const markTodo = async (id) => {
    const data = await fetch("http://localhost:3636/todo/complete/" + id, {
      method: "PUT",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error:", err));
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const cancelUpdate = () => {
    setUpdateForm(false);
    setUpdateData("");
  };

  return (
    <div className="container-div">
      <div className="todos-container">
        <h1>What wll you do today {user.username}?</h1>

        <AddTodoForm
          addTodo={addTodo}
          todos={todos}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
        />

        {updateForm ? (
          //UPDATE FORM
          <UpdateTodo
            updateTodo={updateTodo}
            cancelUpdate={cancelUpdate}
            updateData={updateData}
          />
        ) : (
          <>
            <>
              {todos &&
                todos.map((todo, index) => {
                  return (
                    // TODO

                    <div>
                      <div className="col todo-item">
                        <div key={todo._id} className="todo-Num-title">
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
                              updateTodo(todo._id);
                              //setUpdateForm(true);
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
                })}
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoApp;
