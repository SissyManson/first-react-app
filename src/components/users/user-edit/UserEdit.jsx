import React, { useState, useEffect } from "react";
import { getUserById, saveUser } from "../../../core/api/users.api";
import "./UserEdit.css";
import { Redirect } from "react-router-dom";

export function UserEdit(props) {
  console.log(props);

  const [editedUser, setEditedUser] = useState({
    name: "",
    age: 0,
    phone: "",
    email: "",
    password: "",
    isActive: false,
    isAdmin: false,
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (props.computedMatch.params.id) {
      getUserById(props.computedMatch.params.id).then((currentUser) => {
        console.log(currentUser);
        setEditedUser(currentUser.data);
      });
    }
  }, [props.computedMatch.params.id]);

  const onInputChange = (event) => {
    event.persist();

    setEditedUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    saveUser(editedUser)
      .then(() => {
        console.log("SUCCESS");
        setShouldRedirect(true);
      })
      .catch((err) => console.error(err));
  };

  const onCheckboxChange = (event) => {
    event.persist();
    setEditedUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <>
      {shouldRedirect && <Redirect to="/users" />}
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
            <label htmlFor="phone-edit">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone-edit"
              className="form-control"
              onChange={onInputChange}
              value={editedUser.phone}
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
            <div className="is">
              <label htmlFor="isActive-edit">Is Active:</label>
              <input
                type="checkbox"
                name="isActive"
                id="isActive-edit"
                className="form-control"
                onChange={onCheckboxChange}
                checked={editedUser.isActive}
              />
            </div>
            <div className="is">
              <label htmlFor="isAdmin-edit">Is Admin:</label>
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin-edit"
                className="form-control"
                onChange={onCheckboxChange}
                checked={editedUser.isAdmin}
              />
            </div>
          </div>
          <button id="btn-edit" className="btn btn-lg btn-block">
            Save User
          </button>
        </form>
      </div>
    </>
  );
}
