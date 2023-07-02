import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Auth2 from "./Auth2";
import { MemoryRouter } from "react-router-dom";
const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/auth2" component={Auth2} />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
