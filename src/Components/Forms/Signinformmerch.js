import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Button, Form, Header, Modal } from "semantic-ui-react";

class Signinformmerch extends Component {
  state = {
    email: { valid: false, value: "", validation: "Email is required" },
    password: { valid: false, value: "", validation: "Password is required" },
    formIsValid: false,
    errorModalActive: false,
    // loading: false,
  };
  handleChange = (e) => {
    const fieldName = e.target.id;
    const value = e.target.value;
    const field = { ...this.state[fieldName] };

    switch (fieldName) {
      case "password":
        field.valid = value.length > 5;
        field.validation = field.valid ? "" : "Password is too short";
        break;
      default:
        field.valid = value.length > 0;
        field.validation = field.valid ? "" : `${fieldName} is required`;
        break;
    }
    this.setState({
      [fieldName]: { ...field, value },
    });
  };

  validateForm = () => {
    return new Promise((resolve, reject) => {
      const { formIsValid, errorModalActive, ...fields } = this.state;
      const isFormValid = Object.keys(fields).reduce((acc, fieldKey) => {
        const field = this.state[fieldKey];
        return acc && field.valid;
      }, true);
      this.setState({ formIsValid: isFormValid });
      resolve();
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState({
    //   loading: true,
    // });
    this.validateForm().then(() => {
      if (!this.state.formIsValid) {
        this.setState({ errorModalActive: true });
        return;
      }

      let email = this.state.email.value;
      let password = this.state.password.value;

      fetch("https://ab-inbev-requestapp.herokuapp.com/Merchandiser/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            const { password, ...user } = data;
            alert("You are signed in!");
            this.props.toggleUser(user, "merchandiser");
            this.props.history.push("/dashboard");
          }
        })
        .catch((err) => console.log(err));
    });
  };
  generateErrorMessages = () => {
    const { formIsValid, errorModalActive, ...fields } = this.state;
    return Object.keys(fields).map((fieldKey) => {
      const field = this.state[fieldKey];
      if (!field.valid) {
        return (
          <p key={fieldKey} id="valid-text">
            {field.validation}
          </p>
        );
      }
    });
  };

  closeModal = () => {
    this.setState({ errorModalActive: false });
  };

  //   handleClick = (e) => {
  //     this.setState({
  //       loading: true,
  //     });
  //   };
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
            type="email"
            id="email"
            label="Email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email.value}
          />

          <Form.Input
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password.value}
          />

          <Button
            loading={this.state.loading}
            id="button"
            onClick={this.handleClick}
          >
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signinformmerch;
