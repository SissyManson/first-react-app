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
  }, [props.computedMatch.params.id]); //iskame da se izpulni togava, kogato id-to se promeni

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
              required
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
            <label htmlFor="category">Category:</label>
            <input
              required
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
            <label htmlFor="status">Difficulty:</label>
            <select
              className="form-control"
              name="status"
              id="status"
              value={currentRecipe.status}
              onChange={onInputChange}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Hell">Hell</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              required
              className="form-control"
              id="content"
              name="content"
              rows="10"
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
