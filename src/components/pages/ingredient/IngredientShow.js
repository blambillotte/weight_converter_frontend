import React from "react";
import { connect } from "react-redux";
import {
  getIngredient,
  clearIngredient,
} from "../../../action_creators/ingredients_creators";
import { clearConverstionInputValues } from "../../../action_creators/conversion_form_creators";
import UserConversions from "./UserConversions";
import ConversionsList from "./ConversionsList";

class IngredientShow extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getIngredient,
    } = this.props;
    getIngredient(id);
  }

  componentWillUnmount() {
    const { clearIngredient, clearConverstionInputValues } = this.props;
    clearIngredient();
    clearConverstionInputValues();
  }

  render() {
    const { ingredient, loading } = this.props;
    if (loading || !ingredient) return "loading...";
    return (
      <div id="ingredient-show">
        <div className="container">
          <div className="neu-card mb-4 mt-4 center-content">
            <h2>{ingredient.longDescription}</h2>
            <p>Food Group: {ingredient.foodGroup}</p>
            <ConversionsList />
            <UserConversions />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    ingredient: { data: ingredient, loading },
  } = state;
  return {
    ingredient,
    loading,
  };
}

export default connect(mapStateToProps, {
  getIngredient,
  clearIngredient,
  clearConverstionInputValues,
})(IngredientShow);
