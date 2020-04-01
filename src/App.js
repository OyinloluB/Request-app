import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Components/General/Home";
// import Navbar from "./Components/Layout/Navbar";
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

const ProtectedRoute = ({ path, component: Comp, auth, exact, to, ...props }) => (
  <Route
    path={path}
    exact={!!exact}
    render={() =>
      auth ? (
        <Comp isLoggedIn={auth} {...props} />
      ) : (
        <Redirect to={to || "/"} />
      )
    }
  />
);

const PropsRoute = ({ component: Comp, ...props }) => (
  <Route path={props.path} render={(routeProps) => <Comp {...routeProps} {...props} />} />
);

class App extends Component {
  state = {
    isLoggedIn: false,
    merchandiser: false,
    distributor: false
  };
  toggleMerchandiser = arg => {
    this.setState({ isLoggedIn: arg, isMerchandiser: arg });
  };
  toggleDistributor = arg => {
    this.setState({ isLoggedIn: arg, isDistributor: arg });
  };
  logout = () => {
    this.setState({ isLoggedIn: false, merchandiser: false, distributor: false})
  }
  render() {
    return (
      <BrowserRouter>
        {/* <Navbar /> */}
        <div>
          <Switch>
            <PropsRoute exact path="/" component={Home} />
            <PropsRoute
              toggleMerchandiser={this.toggleMerchandiser.bind(this)}
              path="/signinmerch"
              component={Signinformmerch}
            />
            <PropsRoute
              toggleMerchandiser={this.toggleMerchandiser.bind(this)}
              path="/signupmerch"
              component={Signupformmerch}
            />
            
            <PropsRoute
              toggleDistributor={this.toggleDistributor.bind(this)}
              path="/signindist"
              component={Signinformdist}
            />
            <PropsRoute
              toggleDistributor={this.toggleDistributor.bind(this)}
              path="/signupdist"
              component={Signupformdist}
            />
            <ProtectedRoute
              toggleMerchandiser={this.toggleMerchandiser.bind(this)}
              to="/signupmerch"
              path="/dashboard"
              auth={this.state.isLoggedIn}
              component={Sidebar}
              logout={this.logout.bind(this)}
            />
            <ProtectedRoute
              toggleDistributor={this.toggleDistributor.bind(this)}
              to="/signupdist"
              path="/requests"
              auth={this.state.isLoggedIn}
              component={Distributorpage}
              logout={this.logout.bind(this)}
            />
            <PropsRoute path="/signinadmin" component={Signinformadmin} />
            <PropsRoute path="/signupadmin" component={Signupformadmin} />
          </Switch>
          {/* <Updatestock /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
