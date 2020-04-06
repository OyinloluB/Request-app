import React, { Component } from "react";
import { Sidebar, Segment, Button, Menu } from "semantic-ui-react";
import { Route, NavLink } from "react-router-dom";
import Dashboard from "../Merchandiser/Dashboard";
import Request from "../Merchandiser/Request";
import ViewRequests from "../Merchandiser/ViewRequests";
import Hamburger from "../../../Assets/hamburger.png";

class SidebarLeftScaleDown extends Component {
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
            id="hamburger"
            animation="scale down"
            width="thin"
            id="sidebar"
            visible={visible}
            icon="labeled"
            vertical
            inverted
          >
            <Menu.Item name="home">
              <NavLink to="/dashboard/">Stock Cases</NavLink>
            </Menu.Item>
            <Menu.Item name="gamepad">
              <NavLink to="/dashboard/request">Make Request</NavLink>
            </Menu.Item>
            <Menu.Item name="gamepad">
              <NavLink to="/dashboard/myrequest">All Requests</NavLink>
            </Menu.Item>
            {/* <Menu.Item name="camera">
              <NavLink to="/dashboard/editdetails">Edit details</NavLink>
            </Menu.Item> */}
            <Menu.Item name="camera" onClick={this.props.logout}>
              Log Out
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic id="segment-height">
              <Route exact path="/dashboard/" component={Dashboard} />
              <Route
                path="/dashboard/request"
                render={() => <Request user={this.props.user} />}
              />
              <Route
                path="/dashboard/myrequest"
                render={() => <ViewRequests user={this.props.user} />}
              />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarLeftScaleDown;
