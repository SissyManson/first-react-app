import React, { useState } from "react";
import "./Login.css";
import { login } from "../../../core/api/users.api";
import { Redirect, Link } from "react-router-dom";

export function Login(props) {
  const [userData, setUserData] = useState({});
  const [isLoggedUser, setLoggedUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onInputChange = (event) => {
    event.persist();
    console.log(event);

    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setErrorMessage("");
    console.log(userData);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    login(userData)
      .then(() => {
        console.log("LOGIN SUCCESS");
        setLoggedUser(true);
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <>
      {isLoggedUser && <Redirect to="/" />}
      <div className="login-wrapper">
        <form className="login-form" onSubmit={onFormSubmit}>
          <h1 id="login">Login</h1>
          {errorMessage && <h6 className="text-danger">{errorMessage}</h6>}
          <div className="form-group">
            <label htmlFor="emaiL">Email:</label>
            <input
              type="email"
              placeholder="example@email.com"
              name="email"
              id="emaiL"
              className="form-control"
              onChange={onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passL">Password:</label>
            <input
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              name="password"
              id="passL"
              className="form-control"
              onChange={onInputChange}
            />
          </div>
          <button id="btn" className="btn btn-lg btn-block">
            Sign In
          </button>
          <span id="toRegister">
            <Link to="/register">New here? Sign Up.</Link>
          </span>
        </form>
      </div>
    </>
  );
}
