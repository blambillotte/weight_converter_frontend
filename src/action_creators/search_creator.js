import { SET_SEARCH_INPUT_VALUE } from "../action_types";

export function setSearchInputValue(value) {
  return {
    type: SET_SEARCH_INPUT_VALUE,
    payload: { value },
  };
}
