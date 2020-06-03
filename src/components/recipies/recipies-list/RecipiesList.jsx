import React, { useState, useEffect } from "react";
import { RecipeCard } from "../recipe-card/RecipeCard";
import { getAllRecipies, deleteRecipe } from "../../../core/api/recipies.api";

export function RecipiesList() {
  const [recipies, setRecipies] = useState([]);

  useEffect(() => {
    getAllRecipies().then((result) => {
      setRecipies(result.data);
    });
  }, []); //za da se trigerne samo vednuj podavame [] prazen masiv

  const onDelete = (id) => {
    deleteRecipe(id).then(() => {
      setRecipies((prevState) => {
        return prevState.filter((recipe) => recipe.id !== id);
      });
    });
  };

  return (
    <div className="recip-list-wrapper">
      {recipies.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} onDeleteClick={onDelete} />
      ))}
    </div>
  );
}
