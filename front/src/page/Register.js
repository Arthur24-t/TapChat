import React from "react";
import "../css/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function sendLog() {
  const dataToSubmit = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("passwrd").value,
  };
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8080/auth/signup", dataToSubmit)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        resolve(error);
      });
  });
}
function Register() {
  return (
    //the register formulary
    <div className="cover-register">
      <h1 className="titre">Register</h1>
      <h2 className="sub_title">Your username :</h2>
      <input
        className="identification"
        type="text"
        placeholder="username"
        id="username"
      />
      <h2 className="sub_title">Your mail address :</h2>
      <input
        className="identification"
        type="text"
        placeholder="email"
        id="email"
      />
      <h2 className="sub_title">Your password :</h2>
      <input
        className="identification"
        type="password"
        placeholder="password"
        id="passwrd"
      />
      <button className="login-btn" onClick={sendLog}>
        Register
      </button>
      <Link to="/" className="link">
        <button className="register-btn">Already have an account</button>
      </Link>
    </div>
  );
}

export default Register;
