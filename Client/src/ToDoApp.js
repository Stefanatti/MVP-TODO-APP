import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoApp.css";
import AddTodoForm from "./ToDoApp-Components/AddTodoForm";
import UpdateTodo from "./ToDoApp-Components/UpdateTodo";
import ToDo from "./ToDoApp-Components/ToDo";
import PopUp from "./ToDoApp-Components/PopUp";

const ToDoApp = () => {
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [updateData, setUpdateData] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (!user._id) {
      return;
    }
    getTodos();
  }, [user._id]);

  const getTodos = () => {
    axios
      .get("http://localhost:3636/todo/" + user._id)
      .then(({ data }) => {
        console.log(data);
        setTodos(data);
      })
      .catch((err) => console.error("Error:", err));
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo) {
      await axios
        .post("http://localhost:3636/todo/", {
          todo: newTodo,
          owner: user._id,
        })
        .then((res) => {
          getTodos();
          return res;
        })
        .catch((err) => console.error("Error:", err));

      setNewTodo("");
    } else {
      alert("Please write something you are planing to do.");
    }
  };

  const deleteTodo = async (id) => {
    const data = await fetch("http://localhost:3636/todo/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        getTodos();
        return res;
      })
      .catch((err) => console.error("Error:", err));
    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const updateTodo = async (id) => {
    await axios
      .put("http://localhost:3636/todo/" + id, {
        todo: updateData,
      })
      .then((res) => {
        getTodos();
        return res;
      })
      .catch((err) => console.error("Error:", err));
    setUpdateForm(false);
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
    <div className="app-container">
      <div className="container-div">
        <div className="todos-container">
          <h1>
            What wll you do today{" "}
            <a
              className="username"
              onClick={() => {
                setOpenPopUp(true);
              }}
            >
              {user.username}{" "}
            </a>
            ?
          </h1>

          <AddTodoForm
            addTodo={addTodo}
            todos={todos}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
          />
          {updateForm && (
            <UpdateTodo
              todos={todos}
              updateId={updateId}
              updateTodo={updateTodo}
              cancelUpdate={cancelUpdate}
              updateData={updateData}
              setUpdateData={setUpdateData}
            />
          )}

          {todos &&
            todos.map((todo, index) => {
              return (
                <ToDo
                  key={todo._id}
                  todo={todo}
                  index={index}
                  deleteTodo={deleteTodo}
                  setUpdateId={setUpdateId}
                  setUpdateForm={setUpdateForm}
                  setUpdateData={setUpdateData}
                  markTodo={markTodo}
                />
              );
            })}
        </div>
        <PopUp
          open={openPopUp}
          onClose={() => {
            setOpenPopUp(false);
          }}
        />
      </div>
    </div>
  );
};

export default ToDoApp;
