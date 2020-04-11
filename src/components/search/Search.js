import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import SearchInput from "./SearchInput";
import "./Search.scss";

const searchClient = algoliasearch("8OMU3L8VBF", "00f66a568848e687831d3ea33f95d80b");
const BLACKLISTED_FOOD_GROUPS = [300, 600, 800];

class Search extends React.Component {
  buildFilter() {
    const filters = BLACKLISTED_FOOD_GROUPS.map((foodGroup) => `foodGroupNumber!=${foodGroup}`);
    const joinedFilters = filters.join(" OR ");
    return `(${joinedFilters})`;
  }

  render() {
    return (
      <div id="search">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <h1>Start typing to search an ingredient</h1>
            <InstantSearch searchClient={searchClient} indexName="foods">
              <Configure hitsPerPage={50} numericFilters={this.buildFilter()} />
              <SearchInput />
            </InstantSearch>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
