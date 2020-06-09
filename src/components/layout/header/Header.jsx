import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { logout, getLoggedUser } from "../../../core/api/users.api";

export function Header() {
  
  const [isLoggedOut, setLogoutFlag] = useState(false);
  const onLogout = (event) => {
    logout();
    setLogoutFlag(true);
  };

  const srcbar={
    position: "absolute",
    right: "12rem"
  }

  return (
    <>
      {isLoggedOut && <Redirect to="/login" />}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {!isLoggedOut && (
          <span className="navbar-brand" href="#">
            Hello {getLoggedUser().name}!
          </span>
        )}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/create">
                Create User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipies">
                All Recipies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipies/my-recipies">
                My Recipies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipies/create">
                Create Recipies
              </Link>
            </li>
          </ul>
        </div>
        <span className="btn btn-outline-info" onClick={onLogout}>
          Logout
        </span>
      </nav>
    </>
  );
}
