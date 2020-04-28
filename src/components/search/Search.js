import React from "react";
import { connect } from "react-redux";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import { searchClient } from "../../services/algolia";
import SearchInput from "./SearchInput";
import "./Search.scss";
import { setSearchInputValue } from "../../action_creators/search_creator";

const IGNORED_FOOD_GROUPS = [300, 600, 800, 2100, 2200, 3600];

class Search extends React.Component {
  buildFilter() {
    const filters = IGNORED_FOOD_GROUPS.map(
      (foodGroup) => `foodGroupNumber!=${foodGroup}`
    );
    const joinedFilters = filters.join(",");
    return joinedFilters;
  }

  render() {
    const { setSearchInputValue, inputValue } = this.props;

    return (
      <div id="search">
        <div className="container">
          <div className="neu-card mb-4 mt-4 center-content">
            <h2>Start typing to search an ingredient</h2>
            <InstantSearch searchClient={searchClient} indexName="foods">
              <Configure hitsPerPage={50} numericFilters={this.buildFilter()} />
              <SearchInput
                defaultRefinement={inputValue}
                setSearchInputValue={setSearchInputValue}
              />
            </InstantSearch>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    searchForm: { searchInputValue },
  } = state;
  return {
    inputValue: searchInputValue,
  };
}

export default connect(mapStateToProps, { setSearchInputValue })(Search);
