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

class VolumeToWeight extends React.Component {
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

  $convertedAmtDisplay() {
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
      <div className="converted-amt-display body-bold uk-card uk-box-shadow-medium">
        <div className="large-heavy amt-display-header uk-card-primary">
          {amountDisplay} {conversionDetails.measure_description} converts to:
        </div>
        <div className="medium-heavy weight-display">{amountInGrams} grams</div>
        <div className="medium-heavy weight-display">{amountInOz} oz</div>
        {/* <button className="neu-btn circle-btn">&#43;</button> */}
      </div>
    );
  }

  render() {
    const { conversions, conversionForm } = this.props;
    if (!conversions.length) return null;
    const measurementInputs = this.getMeasurementInputValues();

    return (
      <div id="volume-to-weight">
        <form className="uk-grid-small" data-uk-grid>
          <div className="uk-width-1-2@s">
            <label htmlFor="measure-amount-input" className="bold-label">
              Amount
            </label>
            <select
              id="measure-amount-input"
              name="measure-amount-input"
              className="uk-input"
              value={conversionForm.measureAmountInput}
              onChange={(ev) => this.setFormState("measureAmountInput", ev.target.value)}
            >
              {MEASURE_AMOUNT_OPTIONS.map((input) => (
                <option key={`input:${input.value}`} value={input.value}>
                  {input.label}
                </option>
              ))}
            </select>
          </div>

          <div className="uk-width-1-2@s">
            <label htmlFor="measure-description-input" className="bold-label">
              Measurement
            </label>
            <select
              id="measure-description-input"
              name="measure-description-input"
              className="uk-input"
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
  VolumeToWeight
);
