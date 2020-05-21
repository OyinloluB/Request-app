import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Components/General/Home";
import { Notifications } from "react-push-notification";
import Signinformmerch from "./Components/Forms/Signinformmerch";
import Signinformdist from "./Components/Forms/Signinformdist";
import Signupformmerch from "./Components/Forms/Signupformmerch";
import Signupformdist from "./Components/Forms/Signupformdist";
import Signinformadmin from "./Components/Forms/Signinformadmin";
import Signupformadmin from "./Components/Forms/Signupformadmin";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//for viewing purposes
import Sidebar from "./Components/Profiles/Merchandiser/Sidebar";
import SidebarDist from "./Components/Profiles/Distributor/SidebarDist";
import SidebarAdmin from "./Components/Profiles/Admin/SidebarAdmin";

const ProtectedRoute = ({
  path,
  component: Comp,
  auth,
  exact,
  to,
  ...props
}) => (
  <Route
    path={path}
    exact={!!exact}
    render={(routeProps) =>
      auth ? (
        <Comp isLoggedIn={auth} {...props} {...routeProps} />
      ) : (
        <Redirect to={to || "/"} />
      )
    }
  />
);

const PropsRoute = ({ component: Comp, ...props }) => (
  <Route
    path={props.path}
    render={(routeProps) => <Comp {...routeProps} {...props} />}
  />
);

class App extends Component {
  state = {
    isLoggedIn: false,
    user: null,
    isMerchandiser: false,
    isDistributor: false,
    isAdmin: false,
  };
  toggleUser = (user, type) => {
    const stateKey = `is${type[0].toUpperCase()}${type.substring(1)}`;
    this.setState({ isLoggedIn: true, [stateKey]: true, user });
  };
  logout = () => {
    this.setState({
      user: null,
      isLoggedIn: false,
      isMerchandiser: false,
      isDistributor: false,
      isAdmin: false,
    });
  };
  render() {
    return (
      <BrowserRouter>
        <Notifications />
        <div>
          <Switch>
            <PropsRoute exact path="/" component={Home} />
            <PropsRoute
              toggleUser={this.toggleUser.bind(this)}
              path="/signinmerch"
              component={Signinformmerch}
            />
            <PropsRoute
              toggleUser={this.toggleUser.bind(this)}
              path="/signupmerch"
              component={Signupformmerch}
            />

            <PropsRoute
              toggleUser={this.toggleUser.bind(this)}
              path="/signindist"
              component={Signinformdist}
            />
            <PropsRoute
              toggleUser={this.toggleUser.bind(this)}
              path="/signupdist"
              component={Signupformdist}
            />
            <ProtectedRoute
              user={this.state.user}
              to="/signupmerch"
              path="/dashboard/"
              auth={this.state.isLoggedIn}
              component={Sidebar}
              logout={this.logout.bind(this)}
            />
            <ProtectedRoute
              user={this.state.user}
              to="/signupdist"
              path="/distributor-dash/"
              auth={this.state.isLoggedIn}
              component={SidebarDist}
              logout={this.logout.bind(this)}
            />
            <ProtectedRoute
              user={this.state.user}
              to="/signupadmin"
              path="/distributor/"
              auth={this.state.isLoggedIn}
              component={SidebarAdmin}
              logout={this.logout.bind(this)}
            />
            <PropsRoute
              toggleUser={this.toggleUser.bind(this)}
              path="/signinadmin"
              component={Signinformadmin}
            />
            <PropsRoute
              toggleUser={this.toggleUser.bind(this)}
              path="/signupadmin"
              component={Signupformadmin}
            />
          </Switch>
          {/* <Updatestock /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
