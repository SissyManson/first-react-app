import React from "react";
import "./RecipeCard.css";
import editt from "./edit.png";
import delette from "./delete.png";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../../../core/api/users.api";
import { ReciStatus } from "../../../core/api/recipies.api";

//informaciqta za receptata idva kato props, no pri destrukturirane mojem da q vzemem taka: recipe
export function RecipeCard({ recipe, onDeleteClick }) {
  const reciStyle = {
    width: "20rem",
    margin: "0.5rem",
  };

  const loggedUser = getLoggedUser();

  let reciClassByType = "card text-white m-3 ";
  switch (recipe.status) {
    case ReciStatus.Easy:
      reciClassByType += "bg-success";
      break;
    case ReciStatus.Medium:
      reciClassByType += "bg-info";
      break;
    case ReciStatus.Hard:
      reciClassByType += "bg-secondary";
      break;
    case ReciStatus.Hell:
      reciClassByType += "bg-danger";
      break;
    default:
      reciClassByType += "card text-white bg-dark mb-3";
      break;
  }

  return (
    <div className="recipe-wrapper">
      <div id="recipe" className={reciClassByType} style={reciStyle}>
        <div className="card-header">
          <h5>{recipe.title}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">{recipe.content}</p>

          <span>Category: {recipe.category}</span>
          <br />
          {recipe.status && (
            <span className="text-warning">Difficulty: {recipe.status}</span>
          )}
          <hr />
          {(loggedUser.isAdmin || loggedUser.id === recipe.authorId) && (
            <img
              src={delette}
              id="del"
              alt="Delete"
              onClick={() => onDeleteClick(recipe.id)}
            />
          )}
          <small id="author" className="text-warning">
            Author: {recipe.authorName}
          </small>

          {(loggedUser.isAdmin || loggedUser.id === recipe.authorId) && (
            <Link to={`/recipies/edit/${recipe.id}`}>
              <img src={editt} id="edit" alt="Edit" />
            </Link>
          )}
          <div className="createdOn">
            Created on: <br /> {recipe.date}
          </div>
        </div>
      </div>
    </div>
  );
}
