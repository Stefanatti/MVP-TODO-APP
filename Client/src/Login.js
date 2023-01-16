import "./SignUp-login.css";
import { Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3636/user/login", {
        username,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/profile");
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <Container id="main-container">
      <main class="form-signin w-100 m-auto">
        <form>
          <h1 class="h3 mb-3 fw-normal">Please login</h1>

          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button
            class="w-100 btn btn-lg btn-success"
            type="submit"
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>
          <p class="mt-5 mb-3 text-muted">&copy; 2022-2023</p>
        </form>
      </main>
    </Container>
  );
};

export default Login;
