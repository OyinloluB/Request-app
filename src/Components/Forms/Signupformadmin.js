import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Button, Form, Header, Modal } from "semantic-ui-react";

class Signupformadmin extends Component {
  state = {
    username: { valid: false, value: "", validation: "Name is required" },
    // location: { valid: false, value: "", validation: "Location is required" },
    password: { valid: false, value: "", validation: "Password is required" },
    formIsValid: false,
    errorModalActive: false
  };
  handleChange = e => {
    const fieldName = e.target.id;
    const value = e.target.value;
    const field = { ...this.state[fieldName] };

    switch (fieldName) {
      case "username":
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

    this.setState({
      [fieldName]: { ...field, value }
    });
  };

  validateForm = () => {
		return new Promise((resolve, reject) => {
			const {formIsValid, errorModalActive, ...fields} = this.state;
			const isFormValid = Object.keys(fields).reduce((acc, fieldKey) => {
				const field = this.state[fieldKey];
				return acc && field.valid;
			}, true);
      this.setState({formIsValid: isFormValid});
      resolve();
		});
	};

  handleSubmit = e => {
    e.preventDefault();
    this.validateForm().then(() => {
      if (!this.state.formIsValid) {
        this.setState({ errorModalActive: true });
        return;
      }
      let username = this.state.username.value;
      let password = this.state.password.value;
  
      fetch("https://ab-inbev-requestapp.herokuapp.com/Admin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert('You are signed up!')
          this.props.toggleAdmin(true);
          this.props.history.push("/distributor/");
        })
        .catch((err) => console.log(err));
    })
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
            id="username"
            label="Name"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.username.value}
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
            Sign up
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signupformadmin;
