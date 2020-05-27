import React, { Component } from "react";
import Navbar from "../Layout/Navbar";
import { Button, Form, Header, Modal } from "semantic-ui-react";

class Signupformdist extends Component {
  state = {
    name: { valid: false, value: "", validation: "Name is required" },
    location: { valid: false, value: "", validation: "Location is required" },
    password: { valid: false, value: "", validation: "Password is required" },
    // distributor: {
    //   valid: false,
    //   value: "",
    //   validation: "Distributor is required",
    // },
    formIsValid: false,
    errorModalActive: false,
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
      case "location":
        field.valid = value !== "";
        field.validation = field.valid ? "" : "Location cannot be empty";
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

  handleDistributorChange = (e, { value }) => {
    this.setState({
      distributor: { valid: true, value: value, validation: "" },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.validateForm().then(() => {
      // if (!this.state.formIsValid) {
      //   this.setState({ errorModalActive: true });
      //   return;
      // }
      let name = this.state.name.value;
      let location = this.state.location.value;
      let password = this.state.password.value;
      // const distributor = this.state.distributor.value;

      fetch("https://ab-inbev-requestapp.herokuapp.com/Distributor", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          // distributor: distributor,
          location: location,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.distributor._id);
          if (data.distributor._id) {
            const { password, ...user } = data;
            alert("You are signed up!");
            this.props.toggleUser(user, "distributor");
            this.props.history.push("/distributor-dash/");
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
          {/* <Form.Select
            placeholder="Select Distributor Developer"
            options={this.state.distributors}
            label="Distributor Developer"
            onChange={this.handleDistributorChange}
          /> */}

          <Form.Input
            type="text"
            id="name"
            label="Distributor Developer Name"
            placeholder="Distributor Developer Name"
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
            Sign up
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signupformdist;
