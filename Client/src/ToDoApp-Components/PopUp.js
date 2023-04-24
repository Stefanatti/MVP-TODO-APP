import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PopUp = ({ open, onClose }) => {
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "/user/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          setUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const logOut = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    }
  };

  if (!open) return null;
  return (
    <div>
      <div className="modalOverlay" onClick={onClose}>
        <div className="pop-up">
          <a onClick={() => logOut()} className="log-out">
            Logout ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
