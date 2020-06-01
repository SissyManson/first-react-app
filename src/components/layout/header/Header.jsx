import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../../core/api/users.api";

const styles = {
  color: "lightgray",
  cursor:"pointer",
  border: "1px solid white",
  borderRadius: "5px",
  padding: "5px 10px"
};

export function Header() {
  const [isLoggedOut, setLogoutFlag] = useState(false);
  const onLogout = (event) => {
    logout();
    setLogoutFlag(true);
  };

  return (
    <>
      {isLoggedOut && <Redirect to="/login" />}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand" href="#">
          Hello neighbour!
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
              <Link className="nav-link" to="/">
                Recipies
              </Link>
            </li>
          </ul>
        </div>
        <span className="bogout-btn" style={styles} onClick={onLogout}>
          Logout
        </span>
      </nav>
    </>
  );
}
