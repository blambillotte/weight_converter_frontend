import { combineReducers } from "redux";
import ingredientsReducer from "./ingredients_reducer";

const appReducer = combineReducers({
  ingredient: ingredientsReducer,
});

export default appReducer;
