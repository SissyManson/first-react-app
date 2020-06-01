import React, { useState, useEffect } from "react";
import { getUserById, editUser } from "../../../core/api/users.api";
import "./UserEdit.css";

export function UserEdit(props) {
  console.log(props);

  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    getUserById(props.computedMatch.params.id).then((currentUser) => {
      console.log(currentUser);
      setEditedUser(currentUser.data);
    });
  }, {});

  const onInputChange = (event) => {
    event.persist();

    setEditedUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    editUser(editedUser)
      .then(() => {
        console.log("SUCCESS");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="user-edit-wrapper">
      <form className="user-edit-form" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="name-edit">Name:</label>
          <input
            type="text"
            name="name"
            id="name-edit"
            className="form-control"
            onChange={onInputChange}
            value={editedUser.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age-edit">Age:</label>
          <input
            type="number"
            name="age"
            id="age-edit"
            className="form-control"
            onChange={onInputChange}
            value={editedUser.age}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email-edit">Email:</label>
          <input
            type="email"
            name="email"
            id="email-edit"
            className="form-control"
            onChange={onInputChange}
            value={editedUser.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-edit">Password:</label>
          <input
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            name="password"
            id="password-edit"
            className="form-control"
            onChange={onInputChange}
            value={editedUser.password}
          />
        </div>
        <div className="form-group isActAdm">
          <label htmlFor="isActive-edit">Is Active:</label>
          <input
            type="checkbox"
            name="isActive"
            id="isActive-edit"
            className="form-control"
            onChange={onInputChange}
            checked={editedUser.isActive}
          />
        </div>
        <div className="form-group isActAdm">
          <label htmlFor="isAdmin-edit">Is Admin:</label>
          <input
            type="checkbox"
            name="isAdmin"
            id="isAdmin-edit"
            className="form-control"
            onChange={onInputChange}
            checked={editedUser.isAdmin}
          />
        </div>
        <button id="btn-edit" className="btn btn-lg btn-block">
          Save User
        </button>
      </form>
    </div>
  );
}
