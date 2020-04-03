import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Button, Form, Header, Icon, Modal } from "semantic-ui-react";

class Signupformmerch extends Component {
  state = {
    name: { valid: false, value: "", validation: "Name is required" },
    location: { valid: false, value: "", validation: "Location is required" },
    code: { valid: false, value: "", validation: "Code is required" },
    password: { valid: false, value: "", validation: "Password is required" },
    formIsValid: false,
    errorModalActive: false
  };
  handleChange = e => {
    const fieldName = e.target.id;
    const value = e.target.value;
    const field = { ...this.state[fieldName] };

    switch (fieldName) {
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
      console.log(`${fieldKey}: ${field.valid}`);
      return acc && field.valid;
    }, true);
    console.log(isFormValid);
    this.setState({
      [fieldName]: { ...field, value },
      formIsValid: isFormValid
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.formIsValid) {
      console.log(this.state.formIsValid);
      this.setState({ errorModalActive: true });
      return;
    }
    let name = this.state.name.value;
    let location = this.state.location.value;
    let code = this.state.code.value;
    let password = this.state.password.value;

    console.log(name);
    console.log(location);
    console.log(code);
    console.log(password);

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
        this.props.toggleMerchandiser(true);
        this.props.history.push("/dashboard");
      })
      .catch(err => console.log(err));
  };
  generateErrorMessages = () => {
    const { formIsValid, errorModalActive, ...fields } = this.state;
    return Object.keys(fields).map(fieldKey => {
      const field = this.state[fieldKey];
      if (!field.valid) {
        return <p>{field.validation}</p>;
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
            label="Station Name"
            placeholder="Station Name"
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
            type="text"
            id="code"
            label="Code"
            placeholder="Station Code"
            onChange={this.handleChange}
            value={this.state.code.value}
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

export default Signupformmerch;
