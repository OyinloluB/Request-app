import React, { Component } from "react";
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Icon,
  Header
} from "semantic-ui-react";
import { Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import Updatestock from "./Updatestock";
import Makerequest from "./Makerequest";
import Editdetails from "./Editdetails";

class SidebarLeftScaleDown extends Component {
  state = { visible: false };

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
            <Menu.Item name="home"><NavLink to="/dashboard/">Dashboard</NavLink></Menu.Item>
            <Menu.Item name="gamepad"><NavLink to="/dashboard/request">Make Request</NavLink></Menu.Item>
            <Menu.Item name="camera"><NavLink to="/dashboard/editdetails">Edit details</NavLink></Menu.Item>
            <Menu.Item name="camera">Log Out</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Route exact path="/dashboard/" component={Dashboard} />
              <Route path="/dashboard/request" component={Makerequest} />
              <Route path="/dashboard/editdetails" component={Editdetails} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarLeftScaleDown;