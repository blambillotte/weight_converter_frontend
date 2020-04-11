import React from "react";
import { connectAutoComplete } from "react-instantsearch-dom";
import SearchResults from "./SearchResults";

class SearchInput extends React.Component {
  render() {
    const { currentRefinement, refine } = this.props;
    return (
      <div id="search-input">
        <form className="form-group">
          <input
            type="search"
            className="form-control"
            value={currentRefinement}
            onChange={(event) => refine(event.currentTarget.value)}
            placeholder="Type to search for an ingredient"
          />
        </form>
        <SearchResults />
      </div>
    );
  }
}

export default connectAutoComplete(SearchInput);
