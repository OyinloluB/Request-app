import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
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

    fetch("https://ab-inbev-requestapp.herokuapp.com/distributor_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        location: location,
        password: password
      })
    })
      .then(data => {
        this.props.history.push("/distributor");
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <Navbar />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label id="label">Name</label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </Form.Field>
          <Form.Field>
            <label id="label">Location</label>
            <input
              type="text"
              placeholder="Location"
              id="location"
              onChange={this.handleChange}
              value={this.state.location}
            />
          </Form.Field>
          <Form.Field>
            <label id="label">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Field>
          {/* <NavLink to="/requests"> */}
          <Button id="button" type="submit">
            Submit
          </Button>
          {/* </NavLink> */}
        </Form>
      </div>
    );
  }
}

export default Signinformdist;
