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

export function getIngredient(ndbNumber) {
  return function (dispatch) {
    dispatch(loadIngredient());
    db.collection("foods")
      .where("ndbNumber", "==", ndbNumber)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No ingredient found.");
          // TODO: 404
          return;
        }
        const firstResult = snapshot.docs[0].data();
        dispatch(getIngredientSuccess(firstResult));
      })
      .catch((err) => {
        console.log("Error getting ingredient", err);
      });
  };
}
