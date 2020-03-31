import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Button, Form } from "semantic-ui-react";

class Signupformdist extends Component {
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

    fetch("https://ab-inbev-requestapp.herokuapp.com/Distributor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        location: location,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        this.props.history.push("/requests");
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <Navbar />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label id="label">Station Name</label>
            <input
              type="text"
              value={this.state.name}
              id="name"
              placeholder="Station Name"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label id="label">Location</label>
            <input
              type="text"
              value={this.state.location}
              id="location"
              placeholder="Location"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label id="label">Password</label>
            <input
              type="password"
              value={this.state.password}
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button id="button" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signupformdist;
