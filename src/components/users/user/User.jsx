import React, { Component } from "react";
import { getUserById } from "../../../core/api/users.api";
import { UserCard } from "../user-card/UserCard";
import {
  getReciByAuthorId,
  deleteRecipe,
} from "../../../core/api/recipies.api";
import { RecipeCard } from "../../recipies/recipe-card/RecipeCard";

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      recipies: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    getUserById(this.props.computedMatch.params.id).then((response) => {
      this.setState({
        user: response.data,
      });
    });
    getReciByAuthorId(this.props.computedMatch.params.id).then((recipies) => {
      this.setState({
        recipies, //ako v then e drugo ime, primerno userRecipies sh e recipies:userRecipies
        //kogato sa ednakvi>> recipies(shorthand sintaksis)
      });
    });
  }

  onDelete = (id) => {
    deleteRecipe(id).then(() => {
      const allRecipies = this.state.recipies;
      const newRecipies = allRecipies.filter(recipe=> recipe.id !== id)
      
      this.setState({
        recipies: newRecipies
      });
    });
  };

  render() {
    return (
      <div className="single-user">
        <UserCard user={this.state.user} />
        {this.state.recipies.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} onDeleteClick={this.onDelete} />
        ))}
      </div>
    );
  }
}
