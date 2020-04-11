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
          <div key={hit.objectID} className="card search-result">
            <Link to={`/ingredient/${hit.objectID}`}>
              {hit.longDescription} ({hit.foodGroup})
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default connectStateResults(SearchResults);
