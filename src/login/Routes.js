import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Signup } from "./singup";
import Login from "./login";
import ClientForm from "./client-form";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={Signup} />
        <Route path="/client-form" component={ClientForm} />
      </Switch>
    </Router>
  );
};

export default Routes;
