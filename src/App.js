import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  ShipmentTracking,
  ShipmentInfo,
  ScrollToTop,
} from "./components/index";
import "./App.css";
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={ShipmentTracking} />
        <Route
          path="/tracking-shipment/:trackingnumber"
          component={ShipmentInfo}
        />
        <Redirect from="/" to="/" />
      </Switch>
    </Router>
  );
};

export default App;
