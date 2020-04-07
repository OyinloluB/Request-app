import React, { Component } from "react";
import { Sidebar, Segment, Button, Menu } from "semantic-ui-react";
import { Route, NavLink } from "react-router-dom";
import DashboardDist from "../Distributor/DashboardDist";
import Distributorpage from "../Distributor/Distributorpage";
import Hamburger from "../../../Assets/hamburger.png";

class SidebarDist extends Component {
  state = {
    isLoggedIn: false,
    visible: false,
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <div>
        {/* <Button onClick={this.toggleVisibility} id="hamburger"> */}
        <img src={Hamburger} id="hamburger" onClick={this.toggleVisibility} />
        {/* </Button> */}
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="scale down"
            id="sidebar"
            width="thin"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="dashboard">
              <NavLink to="/distributor-dash/">Stock Updates</NavLink>
            </Menu.Item>
            <Menu.Item name="requests">
              <NavLink to="/distributor-dash/requests">View Requests</NavLink>
            </Menu.Item>
            <Menu.Item name="logout" onClick={this.props.logout}>
              Log Out
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic id="segment-height">
              <Route
                exact
                path="/distributor-dash/"
                component={DashboardDist}
              />
              <Route
                path="/distributor-dash/requests"
                render={() => <Distributorpage user={this.props.user} />}
              />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarDist;
