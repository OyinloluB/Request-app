import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

class Signupformadmin extends Component {
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
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label id="label">Name</label>
          <input
            type="text"
            id="stationname"
            placeholder="Name"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label id="label">Station Code</label>
          <input
            type="password"
            id="password"
            placeholder="Station Code"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label id="label">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button id="button" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default Signupformadmin;
