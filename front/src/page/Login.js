import React, { useEffect } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  function sendLog() {
    const dataToSubmit = {
      username: document.getElementById("username").value,
      password: document.getElementById("passwrd").value,
    };
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8080/auth/signin", dataToSubmit)
        .then((response) => {
          resolve(response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("nickname", response.data.nickname);
          navigate("/Home");
        })
        .catch((error) => {
          resolve(error);
        });
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/Home");
    }
  }, []);

  return (
    <div className="cover-login">
      <h1 className="titre">Login</h1>
      <input
        className="identification"
        type="text"
        placeholder="username"
        id="username"
      />
      <input
        className="identification"
        type="password"
        placeholder="passwrd"
        id="passwrd"
      />
      <button
        className="login-btn"
        onClick={() => {
          sendLog();
        }}
      >
        Login
      </button>
      <Link to="/register" className="link">
        <button className="register-btn">Create an account</button>
      </Link>
    </div>
  );
}

export default Login;
