import React, { useState, useEffect } from "react";
import { saveRecipe, getReciById } from "../../../core/api/recipies.api";
import { Redirect } from "react-router-dom";
import "./Reciedit.css";

export function ReciEdit(props) {
  const [currentRecipe, setCurrentRecipe] = useState({
    //za da nqma problemi s kontrolirani/nekontrolirani inputi
    title: "",
    content: "",
    authorId: "",
    authorName: "",
    difficulty: "",
    category: "",
    date: "",
  });

  const [shouldRedirect, setShouldRedirect] = useState(false);

  console.log(props);
  useEffect(() => {
    if (props.computedMatch.params.id) {
      getReciById(props.computedMatch.params.id).then((result) => {
        setCurrentRecipe(result.data);
      });
    }
  },[props.computedMatch.params.id]); //iskame da se izpulni togava, kogato id-to se promeni

  const onInputChange = (event) => {
    // persistvame(poluchavame dostup po asinhronen nachin) gi zashtoto sa synthetic
    event.persist(); // (persist pozvolqva referenciite kum eventa da se zapazqt v koda)
    setCurrentRecipe((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onReciSave = (event) => {
    event.preventDefault();
    saveRecipe(currentRecipe)
      .then(() => {
        console.log(currentRecipe);
        setShouldRedirect(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {shouldRedirect && <Redirect to="/recipies" />}
      <div className="reci-edit-wrapper">
        <form className="reci-edit-form" onSubmit={onReciSave}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              className="form-control"
              type="text"
              id="title"
              name="title"
              onChange={onInputChange}
              value={currentRecipe.title}
              placeholder="e.g. Chocolate cake"
            />
          </div>
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty:</label>
            <input
              className="form-control"
              type="number"
              min="1"
              max="10"
              id="difficulty"
              name="difficulty"
              onChange={onInputChange}
              value={currentRecipe.difficulty}
              placeholder="Diffulty must be between 1 and 10"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              className="form-control"
              type="text"
              id="category"
              name="category"
              onChange={onInputChange}
              value={currentRecipe.category}
              placeholder="e.g. Desserts, Dinner, etc."
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              rows="5"
              onChange={onInputChange}
              value={currentRecipe.content}
              placeholder="e.g. You need chocolate and cake to make it right"
            />
          </div>
          <button className="btn-save-reci">Save Recipe</button>
        </form>
      </div>
    </>
  );
}
