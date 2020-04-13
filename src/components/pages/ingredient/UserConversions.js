import React from "react";
import { connect } from "react-redux";
import {
  setConversionInputValues,
  setConversionType,
} from "../../../action_creators/conversion_form_creators";
import VolumeToWeight from "./VolumeToWeight";

class UserConversions extends React.Component {
  changeConversionType(ev, conversionType) {
    const { setConversionType } = this.props;
    return setConversionType(conversionType);
  }

  $conversionBtn(btnText, btnKey) {
    const {
      conversionForm: { converstionType },
    } = this.props;
    const selectedClass = converstionType === btnKey ? "neu-btn--selected" : "";
    return (
      <button
        className={`neu-btn ${selectedClass}`}
        onClick={(ev) => this.changeConversionType(ev, btnKey)}
      >
        {btnText}
      </button>
    );
  }

  $conversionForm() {
    const {
      conversionForm: { converstionType },
    } = this.props;

    if (converstionType === "vtw") return <VolumeToWeight />;
    return <VolumeToWeight />; // todo
  }

  render() {
    const { conversions } = this.props;
    if (!conversions.length) return null;

    return (
      <div id="user-conversion">
        <p className="bold-label">Conversion type:</p>
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
