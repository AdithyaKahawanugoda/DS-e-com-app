import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";

import RegistrationScreen from "./screens/RegistrationScreen";

const App = () => {
  return (
    <BRouter>
      <Switch>
        <Route exact path="/registration" component={RegistrationScreen} />
      </Switch>
    </BRouter>
  );
};

export default App;
