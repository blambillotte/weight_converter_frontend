import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/pages/home/Home";
import IngredientShow from "./components/pages/ingredient/IngredientShow";

function routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/ingredient/:id" component={IngredientShow}>
      </Route>
    </Switch>
  );
}

export default routes;