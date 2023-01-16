import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./MvpApp.css";
import SignUp from "./SignUp";
import Login from "./Login";
//import Profile from "./Profile";
import ToDoApp from "./ToDoApp";
import "bootstrap/dist/css/bootstrap.min.css";

function MvpApp() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ToDoApp />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default MvpApp;
