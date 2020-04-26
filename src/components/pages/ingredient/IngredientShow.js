import React from "react";
import { connect } from "react-redux";
import {
  getIngredient,
  clearIngredient,
} from "../../../action_creators/ingredients_creators";
import { clearConverstionInputValues } from "../../../action_creators/conversion_form_creators";
import UserConversions from "./UserConversions";
import ConversionsList from "./ConversionsList";
import Header from "../../Header";

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

  $loading() {
    return <div className="neu-card mb-4 mt-4 center-content" />;
  }

  $noConversion() {
    return (
      <div className="converted-amt-display body-bold">
        Oh shucks! No conversion data available for this ingredient.
      </div>
    );
  }

  $conversionDetails() {
    const { ingredient } = this.props;
    console.log(ingredient.conversions);
    if (!!ingredient & !ingredient.conversions[0]) return this.$noConversion();
    return (
      <div className="conversion-details">
        <ConversionsList />
        <UserConversions />
      </div>
    );
  }

  render() {
    const { ingredient, loading } = this.props;
    if (loading || !ingredient) return this.$loading();
    return (
      <div id="ingredient-show">
        <Header />
        <div className="container">
          <div className="neu-card mb-4 mt-4 center-content">
            <h2>{ingredient.longDescription}</h2>
            <p>Food Group: {ingredient.foodGroup}</p>
            {this.$conversionDetails()}
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
