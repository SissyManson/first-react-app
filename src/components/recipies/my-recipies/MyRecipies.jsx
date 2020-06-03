import React, { useState, useEffect } from "react";
import { RecipeCard } from "../recipe-card/RecipeCard";
import { getMyRecipies } from "../../../core/api/recipies.api";

export function MyRecipies() {
  const [userRecipies, setUserRecipies] = useState([]);

  useEffect(() => {
    getMyRecipies().then((recipies) => {
      setUserRecipies(recipies);
    });
  }, []);

  return (
    <div className="my-reci-wrapper">
      {userRecipies.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
}

