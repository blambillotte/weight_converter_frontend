import { combineReducers } from "redux";
import ingredientsReducer from "./ingredients_reducer";
import conversionFormReducer from "./conversion_form_reducer";
import searchFormReducer from "./search_reducer";

const appReducer = combineReducers({
  ingredient: ingredientsReducer,
  conversionForm: conversionFormReducer,
  searchForm: searchFormReducer,
});

export default appReducer;
