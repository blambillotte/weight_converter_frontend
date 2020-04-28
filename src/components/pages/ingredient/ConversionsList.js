import React from "react";
import { connect } from "react-redux";
import { setConversionInputValues } from "../../../action_creators/conversion_form_creators";

class ConversionsList extends React.Component {
  handleConversionSelection(conversionId) {
    const { setConversionInputValues } = this.props;
    return setConversionInputValues({ measureDescriptionInput: conversionId });
  }

  $noConversions() {
    return <div>No conversions for this item</div>;
  }

  $tableRow(rowData) {
    const { measure_description, measure_amount, weight_in_grams, id } = rowData;
    return (
      <tr key={`row:${id}`} onClick={() => this.handleConversionSelection(id)}>
        <td>
          {measure_amount} {measure_description}
        </td>
        <td>{weight_in_grams} grams</td>
      </tr>
    );
  }

  render() {
    const { conversions } = this.props;
    if (!conversions.length) return this.$noConversions();

    return (
      <div id="conversions-list" className="neu-container">
        <div className="neu-container--header medium-heavy">Available Conversions</div>
        <table className="table table-sm table-hover neu-table">
          <thead>
            <tr>
              <th scope="col">Volume</th>
              <th scope="col">Weight Conversion</th>
            </tr>
          </thead>
          <tbody>
            {conversions.map((conversion) => {
              return this.$tableRow(conversion);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    ingredient: { data: ingredient, loading },
  } = state;
  const conversions = (ingredient && ingredient.conversions) || [];
  return {
    conversions,
    loading,
  };
}

export default connect(mapStateToProps, { setConversionInputValues })(ConversionsList);
