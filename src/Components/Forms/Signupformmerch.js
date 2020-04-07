import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Button, Form, Header, Modal, Select } from "semantic-ui-react";

class Signupformmerch extends Component {
  state = {
    name: { valid: false, value: "", validation: "Name is required" },
    location: { valid: false, value: "", validation: "Location is required" },
    code: { valid: false, value: "", validation: "Code is required" },
    password: { valid: false, value: "", validation: "Password is required" },
    distributor: {
      valid: false,
      value: "",
      validation: "Distributor is required",
    },
    formIsValid: false,
    errorModalActive: false,
    // loading: false,
    distributors: [
      { key: "af", value: "Isolo Depot", text: "Isolo Depot" },
      { key: "ax", value: "Roll Max", text: "Roll Max" },
      { key: "al", value: "Oja Trading", text: "Oja Trading" },
      { key: "dz", value: "Onisha Depot", text: "Onisha Depot" },
      { key: "as", value: "Abuja Depot", text: "Abuja Depot" },
      { key: "ad", value: "Ilesha", text: "Ilesha" },
      { key: "ao", value: "Nikky Venture", text: "Nikky Venture" },
      { key: "ai", value: "Monijez", text: "Monijez" },
      { key: "ag", value: "Bisihans", text: "Bisihans" },
    ],
  };
  handleChange = (e) => {
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

    this.setState({
      [fieldName]: { ...field, value },
    });
  };

  handleDistributorChange = (e, { value }) => {
    this.setState({
      distributor: { valid: true, value: value, validation: "" },
    });
  };

  // handleClick = (e) => {
  //   this.setState({
  //     loading: true,
  //   });
  // };

  validateForm = () => {
    return new Promise((resolve, reject) => {
      const {
        formIsValid,
        errorModalActive,
        distributors,
        ...fields
      } = this.state;
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
    this.validateForm().then(() => {
      if (!this.state.formIsValid) {
        this.setState({ errorModalActive: true });
        return;
      }
      const name = this.state.name.value;
      const location = this.state.location.value;
      const code = this.state.code.value;
      const password = this.state.password.value;
      const distributor = this.state.distributor.value;

      fetch("https://ab-inbev-requestapp.herokuapp.com/Merchandiser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          code,
          password,
          distributor,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            const { password, ...user } = data;
            alert("You are signed up!");
            this.props.toggleUser(user, "merchandiser");
            this.props.history.push("/dashboard");
          }
        })
        .catch((err) => console.log(err));
    });
  };
  generateErrorMessages = () => {
    const { formIsValid, errorModalActive, loading, ...fields } = this.state;
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
            type="number"
            id="code"
            label="Code"
            placeholder="Station Code"
            onChange={this.handleChange}
            value={this.state.code.value}
          />

          <Form.Select
            placeholder="Select Distributor Developer"
            options={this.state.distributors}
            label="Distributor Developer"
            onChange={this.handleDistributorChange}
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

export default Signupformmerch;
