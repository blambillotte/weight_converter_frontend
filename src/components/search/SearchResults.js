import React from "react";
import { connectStateResults } from "react-instantsearch-dom";
import { withRouter } from "react-router-dom";

class SearchResults extends React.Component {
  handleOnClick(ndbNumber) {
    const {
      history: { push },
    } = this.props;
    return push(`/ingredients/${ndbNumber}`);
  }

  $tableRow(rowData) {
    const { ndbNumber, foodGroup, longDescription } = rowData;
    return (
      <tr key={`row:${ndbNumber}`} onClick={() => this.handleOnClick(ndbNumber)}>
        <td>{longDescription}</td>
        <td>{foodGroup}</td>
      </tr>
    );
  }

  render() {
    const { searchState, searchResults } = this.props;
    if (!searchState || !searchState.query || !searchResults) return null;
    return (
      <div id="search-results">
        <table className="uk-table uk-table-divider">
          <tbody>{searchResults.hits.map((hit) => this.$tableRow(hit))}</tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(connectStateResults(SearchResults));
