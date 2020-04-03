import React, { Component } from "react";
import { Sidebar, Segment, Button, Menu } from "semantic-ui-react";
import { Route, NavLink } from "react-router-dom";
import DashboardDist from "../Distributor/DashboardDist";
import Distributorpage from "../Distributor/Distributorpage";

class SidebarDist extends Component {
  state = {
    isLoggedIn: false,
    visible: false
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.toggleVisibility}>View Dashboard</Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="scale down"
            width="thin"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="dashboard">
              <NavLink to="/distributor-dash/">Dashboard</NavLink>
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
                component={Distributorpage}
              />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarDist;
