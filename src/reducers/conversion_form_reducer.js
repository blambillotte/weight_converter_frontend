import {
  SET_CONVERSION_INPUT_VALUES,
  CLEAR_CONVERSION_INPUT_VALUES,
  SET_CONVERSION_TYPE,
} from "../action_types";

const INITIAL_STATE = {
  measureAmountInput: 1,
  measureDescriptionInput: "",
  weightInput: 100,
  weightUnitInput: "grams",
  conversionType: "vtw",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CONVERSION_INPUT_VALUES:
      return {
        ...state,
        ...action.payload.data,
      };
    case SET_CONVERSION_TYPE:
      return { ...state, conversionType: action.payload.conversionType };
    case CLEAR_CONVERSION_INPUT_VALUES:
      return INITIAL_STATE;
    default:
      return state;
  }
}
