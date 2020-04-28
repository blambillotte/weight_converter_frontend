import {
  GET_INGREDIENT_SUCCESS,
  LOAD_INGREDIENT,
  CLEAR_INGREDIENT,
} from "../action_types";
import { db } from "../services/firebase";

function getIngredientSuccess(data) {
  return {
    type: GET_INGREDIENT_SUCCESS,
    payload: { data },
  };
}

function loadIngredient() {
  return {
    type: LOAD_INGREDIENT,
  };
}

export function clearIngredient() {
  return {
    type: CLEAR_INGREDIENT,
  };
}

export function getIngredient(objectId) {
  return function (dispatch) {
    dispatch(loadIngredient());
    db.collection("foods")
      .doc(objectId)
      .get()
      .then((ingredient) => {
        if (ingredient.exists) {
          dispatch(getIngredientSuccess(ingredient.data()));
        } else {
          console.error("no ingredient found");
        }
      })
      .catch((err) => {
        console.error("Error getting ingredient", err);
      });
  };
}
