import React from "react";
import "./RecipeCard.css";
import editt from "./edit.png";
import delette from "./delete.png";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../../../core/api/users.api";

//informaciqta za receptata idva kato props, no pri destrukturirane mojem da q vzemem taka: recipe
export function RecipeCard({ recipe, onDeleteClick }) {
  const reciStyle = {
    width: "18rem",
    top: "1rem",
    left: "2rem",
  };

  const loggedUser = getLoggedUser();

  return (
    <div className="card text-white bg-info mb-3" style={reciStyle}>
      <div className="card-header">
        <h5>{recipe.title}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{recipe.content}</p>

        <span className="text-warning">Category: {recipe.category}</span>
        <p className="text-warning">Difficulty: {recipe.difficulty}</p>
        <hr />
        {(loggedUser.isAdmin || loggedUser.id === recipe.authorId) && (
          <img
            src={delette}
            id="del"
            alt="Delete"
            onClick={() => onDeleteClick(recipe.id)}
          />
        )}
        <small id="author" className="text-dark">
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
  );
}
