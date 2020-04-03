import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Button, Form } from "semantic-ui-react";

// import { NavLink } from "react-router-dom";

class Signinformmerch extends Component {
  state = {
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
    let password = this.state.password;
    let code = this.state.code;

    fetch("https://ab-inbev-requestapp.herokuapp.com/merchandiser_login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        code: code
      })
    })
      .then(res => res.json())
      .then(data => {
        this.props.toggleMerchandiser(true);
        this.props.history.push("/dashboard/");
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <Navbar />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label id="label">Station Code</label>
            <input
              type="text"
              value={this.state.code}
              placeholder="Station Code"
              id="code"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label id="label">Password</label>
            <input
              type="password"
              value={this.state.password}
              placeholder="Password"
              id="password"
              onChange={this.handleChange}
            />
          </Form.Field>
          {/* <NavLink to="/dashboard/request"> */}
          <Button id="button" type="submit">
            Submit
          </Button>
          {/* </NavLink> */}
        </Form>
      </div>
    );
  }
}

export default Signinformmerch;
