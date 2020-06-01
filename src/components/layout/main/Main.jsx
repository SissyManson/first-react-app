import React from "react";
import { Switch } from "react-router-dom";
import { UsersList } from "../../users/users-list/UsersJList";
import { User } from "../../users/user/User";
import { AuthRoute } from "../../../core/guards/AuthRoute";
import { UserEdit } from "../../users/user-edit/UserEdit";
import birb from './birb.png';
import "./Main.css";

export function Main() {
  return (
    <div className="main-content">
      <Switch>
        <AuthRoute exact path="/users" component={UsersList} />
        <AuthRoute exact path="/users/:id" component={User} />
        <AuthRoute exact path="/users/edit/:id" component={UserEdit} />
      </Switch>

      <img id="birb" src={birb} title="Birb says AAAAAAAAAAA" alt="Birb"/>
    </div>
    //vrushta nqkakuv jsx; exact sledi tochniq put
  );
}
