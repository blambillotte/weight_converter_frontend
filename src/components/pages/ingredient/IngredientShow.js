import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getIngredient,
  clearIngredient,
} from "../../../action_creators/ingredients_creators";
import { clearConversionInputValues } from "../../../action_creators/conversion_form_creators";
import UserConversions from "./UserConversions";
import ConversionsList from "./ConversionsList";
import Header from "../../Header";
import LoadingBlock from "../../utils/LoadingBlock";

class IngredientShow extends React.Component {
  componentDidMount() {
    this.getFetcher();
  }

  componentWillUnmount() {
    const { clearIngredient, clearConversionInputValues } = this.props;
    clearIngredient();
    clearConversionInputValues();
  }

  getFetcher() {
    const {
      match: {
        params: { ndbNumber },
      },
      getIngredient,
    } = this.props;

    if (isNaN(ndbNumber)) return; // TODO: 404
    getIngredient(parseInt(ndbNumber));
  }

  $loading() {
    return (
      <div className="uk-card uk-card-default">
        <LoadingBlock itemCount={5} />
      </div>
    );
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
    if (!!ingredient & !ingredient.conversions[0]) return this.$noConversion();
    return (
      <div className="conversion-details">
        <ConversionsList />
        <UserConversions />
      </div>
    );
  }

  $cardHeader() {
    const { ingredient } = this.props;

    return (
      <div className="uk-card-header">
        <div className="uk-flex uk-flex-between">
          <div className="uk-width-expand">
            <h2>{ingredient.longDescription}</h2>
            <p>Food Group: {ingredient.foodGroup}</p>
          </div>
          <div className="uk-width-auto">
            <Link to="/" className="uk-button uk-button-default">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  $content() {
    const { ingredient, loading } = this.props;
    if (loading || !ingredient) return this.$loading();

    return (
      <div className="uk-card uk-card-default uk-card-large uk-width-1-1 uk-margin-top">
        <div className="card-content">
          {this.$cardHeader()}

          <div className="uk-card-body">{this.$conversionDetails()}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="ingredient-show">
        <Header />
        <div className="uk-container uk-container-small">{this.$content()}</div>
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
  clearConversionInputValues,
})(IngredientShow);
