import React, { Component } from "react";
import { Sidebar, Segment, Button, Menu } from "semantic-ui-react";
import { Route, NavLink } from "react-router-dom";
import AdminRequest from './AdminRequest';
import Distributordata from './Distributordata';
import Merchandiserdata from './Merchandiserdata';

class SidebarAdmin extends Component {
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
            <Menu.Item name="distributor">
              <NavLink to="/distributor/">Distributor Developer</NavLink>
            </Menu.Item>
            <Menu.Item name="merchandiser">
              <NavLink to="/distributor/merchandiser/">Merchandiser</NavLink>
            </Menu.Item>
            <Menu.Item name="requests">
              <NavLink to="/distributor/admin/requests">Make Request</NavLink>
            </Menu.Item>
            <Menu.Item name="logout" onClick={this.props.logout}>
              Log Out
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic id="segment-height">
              <Route exact path="/distributor/" component={Distributordata} />
              <Route
                exact
                path="/distributor/merchandiser/"
                component={Merchandiserdata}
              />
              <Route
                path="/distributor/admin/requests"
                component={AdminRequest}
              />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default SidebarAdmin;
