import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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

class App extends Component {
  state = {
    user: {},
    isLoggedIn: false,
    redirectPage: ""
  };

  loadUser = (userObj, nextPagePath) => {
    this.setState({
      isLoggedIn: true,
      user: { ...userObj },
      redirectPage: nextPagePath
    });
  };
  render() {
    let page,
      redirectPage = null;
    if (!this.state.isLoggedIn) {
     return( page = (
        <BrowserRouter>
          <Switch>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/signinmerch" component={Signinformmerch} />
            <Route path="/signupmerch" component={Signupformmerch} />
            <Route path="/signindist" component={Signinformdist} />
            <Route path="/signupdist" component={Signupformdist} />
            <Route path="/signinadmin" component={Signinformadmin} />
            <Route path="/signupadmin" component={Signupformadmin} />
          </Switch>
        </BrowserRouter>
      )
     );
    } else {
      page = (
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard" component={Sidebar} />
            <Route path="/requests" component={Distributorpage} />
          </Switch>
        </BrowserRouter>
      );
    }
    if (this.state.redirectPage !== "") {
      redirectPage = <Redirect to={this.state.redirectPage} />;
    }
    return (
      <React.Fragment>
        {redirectPage} {page}
      </React.Fragment>
    );
  }
}

export default App;
