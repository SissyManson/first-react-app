import React from "react";
import "./UserCard.css";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../../../core/api/users.api";

export function UserCard({ user, onDelete }) {
  const loggedUser = getLoggedUser();
  
  return (
    <div className="user-card">
      <div className="picture-holder">
        <img src={user.picture} alt={user.name} />
      </div>
      <div className="info-holder">
        <div>
          <span className="name">Name: </span>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
        <hr />
        <div>
          <span className="age">Phone: </span>
          {user.phone}
        </div>
        <hr />
        <div>
          <span className="email">E-mail: </span>
          {user.email}
        </div>
      </div>
      <hr />
      <div className="btn-holder">
        {loggedUser.isAdmin && (
          <Link to={`/users/edit/${user.id}`}>
            <button className="editDel">Edit</button>
          </Link>
        )}
        {loggedUser.isAdmin && <button className="editDel" onClick={() => onDelete(user.id)}>Delete</button>}
      </div>
    </div>
  );
}
