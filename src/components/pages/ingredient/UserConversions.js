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
    const selectedClass = conversionType === btnKey ? "uk-active" : "";
    return (
      <li className={selectedClass}>
        <button onClick={(ev) => this.changeConversionType(ev, btnKey)}>{btnText}</button>
      </li>
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
        <p className="medium-heavy">Conversion type</p>
        <ul data-uk-tab>
          {this.$conversionBtn("Volume to Weight", "vtw")}
          {this.$conversionBtn("Weight to Volume", "wtv")}
        </ul>
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
