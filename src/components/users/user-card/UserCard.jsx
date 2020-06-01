import React from "react";
import "./UserCard.css";
import edit from "./edit.png"
import { Link } from "react-router-dom";

export function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="picture-holder">
        <span className="edit-icon">
          <Link to={`/users/edit/${user.id}`}>
            <img src={edit} alt="edit"/>
          </Link>
        </span>
          <img src={user.picture} alt={user.name} />
      </div>
      <hr />
      <div className="info-holder">
        <div>
          <span className="name">Name: </span>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
        <div>
          <span className="age">Phone: </span>
          {user.phone}
        </div>
        <div>
          <span className="email">E-mail: </span>
          {user.email}
        </div>
      </div>
    </div>
  );
}
