import React, { Component } from "react";
import "./Register.css";
import { register } from "../../../core/api/users.api";
import { Redirect, Link } from "react-router-dom";
export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      age: "",
      isRegistered: false,
      errorMessage: "",
    };
  }

  onInputChange = (event) => {
    event.persist();

    this.setState({
      [event.target.name]: event.target.value,
      errorMessage:""
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { isRegistered, ...user } = this.state;
    console.log(user);
    register(user)
      .then(() => {
        this.setState({
          isRegistered: true,
        });
      })
      .catch((err) => this.setState({ errorMessage: err.message }));
  };

  render() {
    return (
      <>
        {this.state.isRegistered && <Redirect to="/login" />}
        <div className="register-wrapper">
          <form className="register-form" onSubmit={this.onSubmit}>
            <h2 id="register">Sign Up</h2>
            {this.state.errorMessage && (
              <h6 className="text-danger">{this.state.errorMessage}</h6>
            )}
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                name="age"
                id="age"
                className="form-control"
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="example@email.com"
                name="email"
                id="email"
                className="form-control"
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                name="password"
                id="password"
                className="form-control"
                onChange={this.onInputChange}
                required
              />
            </div>
            <button id="btn" className="btn btn-lg btn-block">
              Register
            </button>
            <span id="toLogin">
              <Link to="/login">Have an account? Login here.</Link>
            </span>
          </form>
        </div>
      </>
    );
  }
}
