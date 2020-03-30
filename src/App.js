import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/General/Home";
import Navbar from "./Components/Layout/Navbar";
import Signinformmerch from "./Components/Forms/Signinformmerch";
import Signinformdist from "./Components/Forms/Signinformdist";
import Signupformmerch from "./Components/Forms/Signupformmerch";
import Signupformdist from "./Components/Forms/Signupformdist";
import Signinformadmin from "./Components/Forms/Signinformadmin";
import Signupformadmin from "./Components/Forms/Signupformadmin";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//for viewing purposes
import Sidebar from "./Components/Profiles/Sidebar";
import Distributorpage from "./Components/Profiles/Distributorpage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signinmerch" component={Signinformmerch} />
          <Route path="/signupmerch" component={Signupformmerch} />
          <Route path="/signindist" component={Signinformdist} />
          <Route path="/signupdist" component={Signupformdist} />
          <Route path="/dashboard" component={Sidebar} />
          <Route path="/requests" component={Distributorpage} />
          <Route path="/signinadmin" component={Signinformadmin} />
          <Route path="/signupadmin" component={Signupformadmin} />
        </Switch>
        {/* <Updatestock /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
