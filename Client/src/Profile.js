import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:3636/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          setUser(data);
        });
    }
  }, []);

  return (
    <div>
      <h1>Hello {user.username}</h1>
    </div>
  );
};

export default Profile;
