import { SET_SEARCH_INPUT_VALUE } from "../action_types";

const INITIAL_STATE = {
  searchInputValue: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SEARCH_INPUT_VALUE:
      return {
        searchInputValue: action.payload.value,
      };

    default:
      return state;
  }
}
