import {
  SET_CONVERSION_INPUT_VALUES,
  CLEAR_CONVERSION_INPUT_VALUES,
  SET_CONVERSTION_TYPE,
} from "../action_types";

export function setConversionInputValues(data) {
  return {
    type: SET_CONVERSION_INPUT_VALUES,
    payload: { data },
  };
}

export function setConversionType(type) {
  return {
    type: SET_CONVERSTION_TYPE,
    payload: { converstionType: type },
  };
}

export function clearConverstionInputValues() {
  return {
    type: CLEAR_CONVERSION_INPUT_VALUES,
  };
}
