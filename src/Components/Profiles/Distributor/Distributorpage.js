import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { Button } from "react-bootstrap";
import Modal from "../../Layout/Modal.js";

class Distributorpage extends Component {
  state = {
    error: null,
    isLoaded: false,
    // requestStatus: false,
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
        const reqs = result.filter((req) => {
          return req.distributor === this.props.user.distributor.name;
        });
        console.log(reqs);
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

  goToStockLevel = () => {
    this.props.history.push("/distributor/stock-level");
  };

  generateRequest = (item) => {
    let requests = `${item.brand}, ${item.sku}, ${item.volume1}, ${item.quantity1}`;
    if (item.volume2) {
      requests += ` ,${item.volume2}, ${item.quantity2}`;
    }
    return requests;
  };

  toggleReqStatus = (status, itemId) => {
    fetch("https://ab-inbev-requestapp.herokuapp.com/toggle-route", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqStatus: status,
        itemId: itemId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success");
        if (status === false) {
          fetch(`https://ab-inbev-requestapp.herokuapp.com/Request/${itemId}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Deleted");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        {/* {this.toggleReqStatus ? <Modal /> : ""} */}
        <Table unstackable singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Station Name</Table.HeaderCell>
              <Table.HeaderCell>Station Location</Table.HeaderCell>
              <Table.HeaderCell>Requests</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.items.map((item) => (
              <Table.Row key={item._id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.location}</Table.Cell>
                <Table.Cell>{this.generateRequest(item)}</Table.Cell>
                <Table.Cell>
                  <Button
                    variant="success"
                    style={{
                      marginRight: "10px",
                    }}
                    onClick={() => this.toggleReqStatus(true, item._id)}
                  >
                    {this.reqStatus ? "Accepted" : "Accept"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => this.toggleReqStatus(false, item._id)}
                  >
                    Decline
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default Distributorpage;
