import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Button, Form, Header, Icon, Modal } from "semantic-ui-react";

class Signinformdist extends Component {
  state = {
    name: { valid: false, value: "", validation: "Name is required" },
    location: { valid: false, value: "", validation: "Location is required" },
    password: { valid: false, value: "", validation: "Password is required" },
    formIsValid: false,
    errorModalActive: false
  };
  handleChange = e => {
    const fieldName = e.target.id;
    const value = e.target.value;
    const field = { ...this.state[fieldName] };

    switch (fieldName) {
      case "name":
        field.valid = value !== "";
        field.validation = field.valid ? "" : "Name cannot be empty";
        break;
      case "password":
        field.valid = value.length >= 6;
        field.validation = field.valid ? "" : "Password is too short";
        break;
      default:
        field.valid = value.length > 0;
        field.validation = field.valid ? "" : `${fieldName} is required`;
        break;
    }
    const { formIsValid, errorModalActive, ...fields } = this.state;
    const isFormValid = Object.keys(fields).reduce((acc, fieldKey) => {
      const field = this.state[fieldKey];
      return acc && field.valid;
    }, true);

    this.setState({
      [fieldName]: { ...field, value },
      formIsValid: isFormValid
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.formIsValid) {
      this.setState({ errorModalActive: true });
      return;
    }
    let name = this.state.name.value;
    let location = this.state.location.value;
    let password = this.state.password.value;

    fetch("https://ab-inbev-requestapp.herokuapp.com/distributor_login", {
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
        alert('You are signed in!')
        this.props.toggleDistributor(true);
        this.props.history.push("/distributor-dash/");
      })
      .catch(err => console.log(err));
  };
  generateErrorMessages = () => {
    const { formIsValid, errorModalActive, ...fields } = this.state;
    return Object.keys(fields).map(fieldKey => {
      const field = this.state[fieldKey];
      if (!field.valid) {
        return <p id="valid-text">{field.validation}</p>;
      }
    });
  };

  closeModal = () => {
    this.setState({ errorModalActive: false });
  };

  render() {
    return (
      <div>
        <Navbar />
        <Modal
          open={this.state.errorModalActive}
          size="mini"
          id="modal"
          onClose={this.closeModal}
          closeIcon
        >
          <Header icon="error" content="Validation Errors" />
          <Modal.Content>{this.generateErrorMessages()}</Modal.Content>
        </Modal>

        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            type="text"
            id="name"
            label="Name"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.name.value}
          />

          <Form.Input
            type="text"
            id="location"
            label="Location"
            placeholder="Location"
            onChange={this.handleChange}
            value={this.state.location.value}
          />

          <Form.Input
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password.value}
          />

          <Button id="button" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signinformdist;