import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

import { NavLink } from "react-router-dom";

class Signinformmerch extends Component {
  state = {
    name: "",
    location: "",
    code: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    let name = this.state.name;
    let location = this.state.location;
    let code = this.state.code;

    console.log(name);
    console.log(location);
    console.log(code);

    this.setState({
      name: name,
      location: location,
      code: code
    });
    try {
      fetch("https://ab-inbev-requestapp.herokuapp.com/merchandiser_auth", {
        method: "POST",
        header: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name,
          location: location,
          code: code
        })
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label id="label">Station Name</label>
          <input
            placeholder="Station Name"
            id="name"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label id="label">Location</label>
          <input
            placeholder="Location"
            id="location"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label id="label">Station Code</label>
          <input
            type="password"
            placeholder="Station Code"
            id="code"
            onChange={this.handleChange}
          />
        </Form.Field>
        <NavLink to="/dashboard/request">
        <Button id="button" type="submit">
          Submit
        </Button>
        </NavLink>
      </Form>
    );
  }
}

export default Signinformmerch;
