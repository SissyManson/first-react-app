import React from "react";
import { Switch } from "react-router-dom";
import { UsersList } from "../../users/users-list/UsersJList";
import { User } from "../../users/user/User";
import { AuthRoute } from "../../../core/guards/AuthRoute";
import { UserEdit } from "../../users/user-edit/UserEdit";
import birb from './birb.png';
import "./Main.css";
import { RecipiesList } from "../../recipies/recipies-list/RecipiesList";
import { ReciEdit } from "../../recipies/reci-edit/ReciEdit";
import { MyRecipies } from "../../recipies/my-recipies/MyRecipies";

export function Main() {
  return (
    <div className="main-content">
      <Switch>
        <AuthRoute exact path="/users" component={UsersList} />
        <AuthRoute exact path="/users/create" admin={true} component={UserEdit} />
        <AuthRoute exact path="/users/:id" component={User} />
        <AuthRoute exact path="/users/edit/:id" admin={true} component={UserEdit} />
      
        <AuthRoute exact path="/recipies" component={RecipiesList} />
        <AuthRoute exact path="/recipies/create" component={ReciEdit} />
        <AuthRoute exact path="/recipies/edit/:id" component={ReciEdit} />
        <AuthRoute exact path="/recipies/my-recipies" component={MyRecipies} />
      </Switch>

      <img id="birb" src={birb} alt="Birb"/>
    </div>
    //vrushta nqkakuv jsx; exact sledi tochniq put
  );
}
