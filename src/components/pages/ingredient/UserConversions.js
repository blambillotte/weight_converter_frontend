import React from "react";
import { connect } from "react-redux";
import {
  setConversionInputValues,
  setConversionType,
} from "../../../action_creators/conversion_form_creators";
import VolumeToWeight from "./VolumeToWeight";
import WeightToVolume from "./WeightToVolume";

class UserConversions extends React.Component {
  changeConversionType(ev, conversionType) {
    const { setConversionType } = this.props;
    return setConversionType(conversionType);
  }

  $conversionBtn(btnText, btnKey) {
    const {
      conversionForm: { conversionType },
    } = this.props;
    const selectedClass = conversionType === btnKey ? "neu-btn--selected" : "";
    return (
      <button
        className={`neu-btn neu-btn--indicator ${selectedClass}`}
        onClick={(ev) => this.changeConversionType(ev, btnKey)}
      >
        {btnText}
      </button>
    );
  }

  $conversionForm() {
    const {
      conversionForm: { conversionType },
    } = this.props;

    if (conversionType === "vtw") return <VolumeToWeight />;
    return <WeightToVolume />;
  }

  render() {
    const { conversions } = this.props;
    if (!conversions.length) return null;

    return (
      <div id="user-conversion">
        <p className="bold-label">Conversion type</p>
        <div className="neu-btn-group">
          {this.$conversionBtn("Volume to Weight", "vtw")}
          {this.$conversionBtn("Weight to Volume", "wtv")}
        </div>
        {this.$conversionForm()}
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