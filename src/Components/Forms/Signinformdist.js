import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

// import { NavLink } from "react-router-dom";

class Signinformdist extends Component {
  state = {
    name: "",
    location: "",
    password: ""
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
    let password = this.state.password;

    console.log(name);
    console.log(location);
    console.log(password);

    this.setState({
      name: name,
      location: location,
      password: password
    });
    try {
      fetch("https://ab-inbev-requestapp.herokuapp.com/distributor_login", {
        method: "POST",
        header: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          location: location,
          password: password
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
            type="text"
            placeholder="Location"
            id="location"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label id="label">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={this.handleChange}
          />
        </Form.Field>
        {/* <NavLink to="/requests"> */}
        <Button id="button" type="submit">
          Submit
        </Button>
        {/* </NavLink> */}
      </Form>
    );
  }
}

export default Signinformdist;
