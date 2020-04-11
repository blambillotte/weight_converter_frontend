import { LOAD_INGREDIENT, GET_INGREDIENT_SUCCESS, CLEAR_INGREDIENT } from "../action_types";

const INITIAL_STATE = { data: null, loading: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INGREDIENT_SUCCESS:
      return { data: action.payload.data, loading: false };
    case LOAD_INGREDIENT:
      return { data: null, loading: true };
    case CLEAR_INGREDIENT:
      return INITIAL_STATE;
    default:
      return state;
  }
}