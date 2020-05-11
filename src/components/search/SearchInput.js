import React from "react";
import { connectAutoComplete } from "react-instantsearch-dom";
import SearchResults from "./SearchResults";
import { debounce } from "../../utils/debounce";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    const { defaultRefinement, refine } = this.props;
    if (!!defaultRefinement) return refine(defaultRefinement);
  }

  onInputChange(ev) {
    const { refine, setSearchInputValue } = this.props;
    const value = ev.currentTarget.value;
    debounce(setSearchInputValue(value), 500);
    return refine(value);
  }

  render() {
    const { currentRefinement } = this.props;
    return (
      <div id="search-input">
        <form
          className="uk-form-stacked"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="search"
            className="uk-input"
            value={currentRefinement}
            onChange={this.onInputChange}
            placeholder="Type to search for an ingredient"
          />
        </form>
        <SearchResults />
      </div>
    );
  }
}

export default connectAutoComplete(SearchInput);
