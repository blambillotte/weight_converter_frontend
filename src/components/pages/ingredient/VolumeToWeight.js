import React from "react";
import { connect } from "react-redux";
import {
  setConversionInputValues,
  setConversionType,
} from "../../../action_creators/conversion_form_creators";
import {
  MEASURE_AMOUNT_OPTIONS,
  getConversionById,
  getMeasureAmountDisplayByValue,
  gramsToOunces,
} from "../../../utils/conversion_utils";

class UserConversions extends React.Component {
  constructor(props) {
    super(props);
    this.setFormState = this.setFormState.bind(this);
  }

  componentDidMount() {
    const {
      setConversionInputValues,
      conversions,
      conversionForm: { measureDescriptionInput },
    } = this.props;
    if (conversions.length && !measureDescriptionInput) {
      return setConversionInputValues({
        measureDescriptionInput: conversions[0].id,
        measureAmountInput: conversions[0].measure_amount,
      });
    }
  }

  setFormState(key, value) {
    const { setConversionInputValues } = this.props;
    return setConversionInputValues({ [key]: value });
  }

  getMeasurementInputValues() {
    const { conversions } = this.props;
    const values = conversions.map((conversion) => ({
      label: conversion.measure_description,
      value: conversion.id,
    }));
    return values;
  }

  formatNumber(number) {
    const float = parseFloat(number);
    if (float > 10) return float.toFixed(0);
    return float.toFixed(1);
  }

  getConvertedValue() {
    const {
      conversions,
      conversionForm: { measureAmountInput, measureDescriptionInput },
    } = this.props;
    const conversionDetails = getConversionById(conversions, measureDescriptionInput);
    const multiplier =
      conversionDetails.weight_in_grams / conversionDetails.measure_amount;
    const value = measureAmountInput * multiplier;
    return this.formatNumber(value);
  }

  $converetedAmtDisplay() {
    const {
      conversionForm: { measureDescriptionInput, measureAmountInput },
      conversions,
    } = this.props;
    if (!measureDescriptionInput) return null;

    const conversionDetails = getConversionById(conversions, measureDescriptionInput);
    const amountDisplay = getMeasureAmountDisplayByValue(measureAmountInput);
    const amountInGrams = this.getConvertedValue();
    const amountInOz = gramsToOunces(amountInGrams);
    return (
      <div className="converted-amt-display body-bold">
        <span>
          {amountDisplay} {conversionDetails.measure_description}
        </span>
        <span>=</span>
        <span className="large-heavy">
          {amountInGrams} grams / {amountInOz} oz
        </span>
      </div>
    );
  }

  render() {
    const { conversions, conversionForm } = this.props;
    if (!conversions.length) return null;
    const measurementInputs = this.getMeasurementInputValues();

    return (
      <div id="volume-to-weight">
        <form>
          <div className="inline-inputs">
            <div className="inline-input-group">
              <label htmlFor="measure-amount-input" className="bold-label">
                Amount
              </label>
              <select
                id="measure-amount-input"
                name="measure-amount-input"
                className="form-control"
                value={conversionForm.measureAmountInput}
                onChange={(ev) =>
                  this.setFormState("measureAmountInput", ev.target.value)
                }
              >
                {MEASURE_AMOUNT_OPTIONS.map((input) => (
                  <option key={`input:${input.value}`} value={input.value}>
                    {input.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="inline-input-group">
              <label htmlFor="measure-description-input" className="bold-label">
                Measurement Type
              </label>
              <select
                id="measure-description-input"
                name="measure-description-input"
                className="form-control"
                value={conversionForm.measureDescriptionInput}
                onChange={(ev) =>
                  this.setFormState("measureDescriptionInput", ev.target.value)
                }
              >
                {measurementInputs.map((input) => (
                  <option key={`input:${input.value}`} value={input.value}>
                    {input.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        {this.$converetedAmtDisplay()}
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
  UserConversions
);
