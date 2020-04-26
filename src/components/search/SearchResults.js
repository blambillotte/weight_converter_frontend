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
            to={`/ingredient/${hit.objectID}`}
            key={hit.objectID}
            className="neu-btn mb-3"
          >
            {hit.longDescription} ({hit.foodGroup})
          </Link>
        ))}
      </div>
    );
  }
}

export default connectStateResults(SearchResults);
