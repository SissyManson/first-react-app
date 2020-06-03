import React from "react";
import { getLoggedUser } from "../api/users.api";
import { Redirect } from "react-router-dom";

export function AuthRoute(props) {
  const loggedUser = getLoggedUser();

  //route requires Admin privileges
  if (props.admin && loggedUser.isAdmin) {
    return <props.component {...props} />;
  }

  //free route
  if (!props.admin && loggedUser) {
    return <props.component {...props} />;
  }

  return <Redirect to="/login" />;
}