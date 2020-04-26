import React from "react";
import { connect } from "react-redux";
import {
  setConversionInputValues,
  setConversionType,
} from "../../../action_creators/conversion_form_creators";

class WeightToVolume extends React.Component {
  constructor(props) {
    super(props);
    this.setFormState = this.setFormState.bind(this);
  }

  setFormState(key, value) {
    const { setConversionInputValues } = this.props;
    return setConversionInputValues({ [key]: value });
  }

  formatNumber(number) {
    const float = parseFloat(number);
    if (float > 10) return float.toFixed(0);
    return float.toFixed(1);
  }

  convertOzToGrams(weightInGrams) {
    return weightInGrams * 28.35;
  }

  getConvertedValues() {
    const {
      conversionForm: { weightInput, weightUnitInput },
      conversions,
    } = this.props;
    const weightInGrams =
      weightUnitInput === "grams" ? weightInput : this.convertOzToGrams(weightInput);
    const conversionArr = conversions.map((conversion) => {
      const { weight_in_grams, measure_amount, measure_description } = conversion;
      const multiplier = weightInGrams / weight_in_grams;
      const multipliedValue = measure_amount * multiplier;
      return `${this.formatNumber(multipliedValue)} ${measure_description}`;
    });
    return conversionArr;
  }

  $convertedAmtDisplay() {
    const {
      conversionForm: { weightInput, weightUnitInput },
    } = this.props;
    if (!weightInput) return null;
    const convertedValues = this.getConvertedValues();
    return (
      <div className="converted-amt-display body-bold">
        <div className="large-heavy amt-display-header">
          {weightInput} {weightUnitInput} converts to:
        </div>
        <div className="amt-value medium-heavy">
          {convertedValues.map((value) => (
            <span key={value} className="volume-display">
              {value}
            </span>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { conversions, conversionForm } = this.props;
    if (!conversions.length) return null;

    return (
      <div id="weight-to-volume">
        <form>
          <div className="inline-inputs">
            <div className="inline-input-group">
              <label htmlFor="weight-input" className="bold-label">
                Amount
              </label>
              <input
                type="number"
                id="weight-input"
                className="form-control"
                name="weight-input"
                value={conversionForm.weightInput}
                onChange={(ev) => this.setFormState("weightInput", ev.target.value)}
                placeholder="Enter amount in grams"
                required
              />
            </div>

            <div className="inline-input-group">
              <label htmlFor="weight-unit-input" className="bold-label">
                Weight Unit
              </label>
              <select
                id="weight-unit-input"
                name="weight-unit-input"
                className="form-control"
                value={conversionForm.weightUnitInput}
                onChange={(ev) => this.setFormState("weightUnitInput", ev.target.value)}
              >
                <option value="grams">Grams</option>
                <option value="oz">Ounces</option>
              </select>
            </div>
          </div>
        </form>
        {this.$convertedAmtDisplay()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    ingredient: { data: ingredient, loading },
    conversionForm,
  } = state;
  const conversions = (ingredient && ingredient.conversions) || [];
  return {
    conversions,
    conversionForm,
    loading,
  };
}

export default connect(mapStateToProps, { setConversionInputValues, setConversionType })(
  WeightToVolume
);
