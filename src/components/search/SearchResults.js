import React from "react";
import { connectStateResults } from "react-instantsearch-dom";
import { Link } from "react-router-dom";

class SearchResults extends React.Component {
  render() {
    const { searchState, searchResults } = this.props;
    if (!searchState || !searchState.query || !searchResults) return null;
    return (
      <div id="search-results">
        {searchResults.hits.map((hit) => (
          <Link
            to={`/ingredients/${hit.ndbNumber}`}
            key={hit.objectID}
            className="neu-btn mb-3 full-width"
          >
            <div className="result-description body-bold">{hit.longDescription} </div>
            <div className="result-food-group body-regular">
              Food Group: {hit.foodGroup}
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default connectStateResults(SearchResults);
