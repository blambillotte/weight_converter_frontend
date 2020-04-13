import { combineReducers } from "redux";
import ingredientsReducer from "./ingredients_reducer";
import conversionFormReducer from "./conversion_form_reducer";

const appReducer = combineReducers({
  ingredient: ingredientsReducer,
  conversionForm: conversionFormReducer,
});

export default appReducer;
