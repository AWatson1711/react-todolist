import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((apiUser) => setUsers(apiUser.data.user))
      .catch((e) => console.error(e));
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;
    setData({ email: emailValue, password: passwordValue });

    console.log(data);
    axios.post("http://localhost:3001/adduser", data).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
    });
  };

  const putSubmit = (e) => {
    e.preventDefault();
    const emailValue = e.target.email2.value;
    axios
      .put("http://localhost:3001/user/4", {
        email: emailValue,
      })
      .then((response) => {
        setData({ email: response.data });
        console.log(data);
      });
  };

  const deleteSubmit = (userId) => {
    axios.delete(`http://localhost:3001/user/${userId}`).then(() => {
      alert("Post deleted!");
      setData();
    });
  };

  return (
    <div>
      <header>
        <h1>Home</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" id="password" required />
          <input type="submit" name="submit" id="submit" />
        </form>

        <form onSubmit={putSubmit}>
          <h2>Modifier un user</h2>
          <label htmlFor="email2">Email</label>
          <input type="email" name="email2" id="email2" required />
          <input type="submit" name="submit" id="submit2" value="Modifier" />
        </form>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <p>
                {user.email}{" "}
                <button
                  onClick={() => {
                    deleteSubmit(user.id);
                  }}
                >
                  Delete
                </button>
              </p>
              <p>{user.password}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Home;
