import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

import { NavLink } from 'react-router-dom';

class Signinformmerch extends Component {
  state = {
    stationname: "",
    password: "",
    location: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <Form>
        <Form.Field>
          <label id="label">Station Name</label>
          <input placeholder="Station Name" />
        </Form.Field>
        <Form.Field>
          <label id="label">Station Code</label>
          <input type="password" placeholder="Station Code" />
        </Form.Field>
        <NavLink to="/dashboard">
          <Button id="button" type="submit">
            Submit
        </Button>
        </NavLink>
      </Form>
    );
  }
}

export default Signinformmerch;
