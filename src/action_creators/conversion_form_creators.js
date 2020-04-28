import {
  SET_CONVERSION_INPUT_VALUES,
  CLEAR_CONVERSION_INPUT_VALUES,
  SET_CONVERSION_TYPE,
} from "../action_types";

export function setConversionInputValues(data) {
  return {
    type: SET_CONVERSION_INPUT_VALUES,
    payload: { data },
  };
}

export function setConversionType(type) {
  return {
    type: SET_CONVERSION_TYPE,
    payload: { conversionType: type },
  };
}

export function clearConversionInputValues() {
  return {
    type: CLEAR_CONVERSION_INPUT_VALUES,
  };
}
