import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Signup } from "./singup";
import Login from "./login";
import ClientForm from "./client-form";
import Schedule from "../components/schedule/schedule";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cadastro" component={Signup} />
        <Route path="/client-form" component={ClientForm} />
        <Route path="/schedule" component={Schedule} />
      </Switch>
    </Router>
  );
};

export default Routes;
