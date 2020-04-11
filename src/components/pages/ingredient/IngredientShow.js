import React from "react";
import { connect } from "react-redux";
import { getIngredient, clearIngredient } from "../../../action_creators/ingredients_creators";

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
    const { clearIngredient } = this.props;
    clearIngredient();
  }

  $conversions() {
    const { ingredient } = this.props;
    const conversions = ingredient.conversions || [];
    if (!conversions.length) return <div>No conversions for this item</div>;

    return (
      <div className="conversions-list">
        {conversions.map((conversion) => {
          const { measure_description, measure_amount, weight_in_grams, id } = conversion;
          return (
            <div key={id} className="conversion">
              {measure_amount} {measure_description} = {weight_in_grams} grams
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { ingredient, loading } = this.props;
    if (loading || !ingredient) return "loading...";
    return (
      <div id="ingredient-show">
        <div className="container">
          <h2>{ingredient.longDescription}</h2>
          <p>Food Group: {ingredient.foodGroup}</p>
          <hr />
          {this.$conversions()}
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

export default connect(mapStateToProps, { getIngredient, clearIngredient })(IngredientShow);
