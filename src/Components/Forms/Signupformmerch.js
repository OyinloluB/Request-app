import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

class Signupformmerch extends Component {
  state = {
    name: "",
    location: "",
    code: "",
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
    let code = this.state.code;
    let password = this.state.password;

    console.log(name);
    console.log(location);
    console.log(code);
    console.log(password);

    try {
      fetch("https://ab-inbev-requestapp.herokuapp.com/Merchandiser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          location: location,
          code: code,
          password: password
        })
      })
        .then(res => res.json())
        .then(data => {
          alert("sign up");
          console.log(data);
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
            type="text"
            id="name"
            placeholder="Station Name"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </Form.Field>
        <Form.Field>
          <label id="label">Location</label>
          <input
            type="text"
            id="location"
            placeholder="Location"
            onChange={this.handleChange}
            value={this.state.location}
          />
        </Form.Field>
        <Form.Field>
          <label id="label">Code</label>
          <input
            type="text"
            id="code"
            placeholder="Station Code"
            onChange={this.handleChange}
            value={this.state.code}
          />
        </Form.Field>
        <Form.Field>
          <label id="label">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </Form.Field>
        <Button id="button" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default Signupformmerch;
