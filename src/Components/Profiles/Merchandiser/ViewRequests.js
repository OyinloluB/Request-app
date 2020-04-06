import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";

class ViewRequests extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
  };

  componentDidMount() {
    fetch("https://ab-inbev-requestapp.herokuapp.com/Request", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(this.props.user);
        const reqs = result.filter((req) => {
          return req.name === this.props.user.name;
        });
        this.setState({
          isLoaded: true,
          items: reqs,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  }

  render() {
    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>SKU</Table.HeaderCell>
            <Table.HeaderCell>Volume</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Volume</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.items.map((item) => (
            <Table.Row key={item._id}>
              <Table.Cell>{item.brand}</Table.Cell>
              <Table.Cell>{item.sku}</Table.Cell>
              <Table.Cell>{item.volume1}</Table.Cell>
              <Table.Cell>{item.quantity1}</Table.Cell>
              <Table.Cell>{item.volume2 || ""}</Table.Cell>
              <Table.Cell>{item.quantity2 || ""}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default ViewRequests;
