import {
  SET_CONVERSION_INPUT_VALUES,
  CLEAR_CONVERSION_INPUT_VALUES,
  SET_CONVERSTION_TYPE,
} from "../action_types";

const INITIAL_STATE = {
  measureAmountInput: 1,
  measureDescriptionInput: "",
  weightInput: 100,
  weightUnitInput: "grams",
  converstionType: "vtw",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CONVERSION_INPUT_VALUES:
      return {
        ...state,
        ...action.payload.data,
      };
    case SET_CONVERSTION_TYPE:
      return { ...state, converstionType: action.payload.converstionType };
    case CLEAR_CONVERSION_INPUT_VALUES:
      return INITIAL_STATE;
    default:
      return state;
  }
}
