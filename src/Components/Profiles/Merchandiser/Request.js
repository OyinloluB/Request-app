import React, { Component } from "react";
import { Button, Select, Form, Input } from "semantic-ui-react";

class Request extends Component {
  state = {
    // distributor: "",
    requests: [
      {
        id: 1,
        name: "Budweiser",
        rgb: [
          { volume: "375", quantity: "" },
          { volume: "600", quantity: "" },
        ],
        can: [
          { volume: "330", quantity: "" },
          { volume: "500", quantity: "" },
        ],
      },
      {
        id: 2,
        name: "Castle Lite",
        rgb: [
          { volume: "375", quantity: "" },
          { volume: "600", quantity: "" },
        ],
      },
      {
        id: 3,
        name: "Trophy Stout",
        rgb: [{ volume: "600", quantity: "" }],
      },
      {
        id: 4,
        name: "Hero",
        rgb: [
          { volume: "375", quantity: "" },
          { volume: "600", quantity: "" },
        ],
        can: [
          { volume: "330", quantity: "" },
          { volume: "500", quantity: "" },
        ],
      },
      {
        id: 5,
        name: "Trophy",
        rgb: [
          { volume: "375", quantity: "" },
          { volume: "600", quantity: "" },
        ],
        can: [
          { volume: "330", quantity: "" },
          { volume: "500", quantity: "" },
        ],
      },
      {
        id: 6,
        name: "Eagle Lager",
        rgb: [
          { volume: "330", quantity: "" },
          { volume: "600", quantity: "" },
        ],
      },
      {
        id: 7,
        name: "Eagle Stout",
        rgb: [
          { volume: "330", quantity: "" },
          { volume: "600", quantity: "" },
        ],
      },
      {
        id: 8,
        name: "Grand Malt",
        rgb: [{ volume: "330", quantity: "" }],
        can: [{ volume: "330", quantity: "" }],
        pet: [
          { volume: "250", quantity: "" },
          { volume: "330", quantity: "" },
        ],
      },
      {
        id: 9,
        name: "Beta Malt",
        rgb: [{ volume: "330", quantity: "" }],
        can: [{ volume: "330", quantity: "" }],
        pet: [
          { volume: "250", quantity: "" },
          { volume: "330", quantity: "" },
        ],
      },
    ],
    currentProduct: {},
    currentSku: {},
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleProductChange = (e, { value }) => {
    const product = this.state.requests.filter(
      (request) => request.id === value
    )[0];
    const sku = { requestId: value, type: "rgb", data: product.rgb };
    this.setState({ currentProduct: { ...product }, currentSku: { ...sku } });
  };

  handleQuantity = (value, volume) => {
    const currentSkuData = this.state.currentSku.data.map((skuDataItem) => {
      if (skuDataItem.volume === volume) {
        skuDataItem.quantity = value;
      }
      return skuDataItem;
    });
    this.setState((prevState) => ({
      currentSku: {
        ...prevState.currentSku,
        data: [...currentSkuData],
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const quantityIsValid = this.state.currentSku.data.reduce(
      (acc, skuItem) => {
        return (
          skuItem.quantity !== "" && !Number(skuItem.quantity).isNaN && acc
        );
      },
      true
    );
    if (quantityIsValid) {
      let requestData = {
        merchandiser: {
          name: this.props.user.name,
          location: this.props.user.location,
          code: this.props.user.code,
          distributor: this.props.user.distributor,
        },
        brand: this.state.currentProduct.name,
        sku: this.state.currentSku.type,
        volume1: `${this.state.currentSku.data[0].volume}ml`,
        quantity1: Number(this.state.currentSku.data[0].quantity),
      };
      if (this.state.currentSku.data.length > 1) {
        requestData = {
          ...requestData,
          volume2: `${this.state.currentSku.data[1].volume}ml`,
          quantity2: Number(this.state.currentSku.data[1].quantity),
        };
      }
      console.log(requestData);
      fetch("https://ab-inbev-requestapp.herokuapp.com/Request", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => {
          console.log(res);
          console.log(JSON.stringify(res));
          return res.json();
        })
        .then((data) => {
          alert("Request Successful!");
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  };

  handleSkuChange = (e, { value }) => {
    this.setState({
      currentSku: {
        requestId: this.state.currentProduct.id,
        type: value,
        data: [...this.state.currentProduct[value]],
      },
    });
  };

  render() {
    const products = this.state.requests.map((request) => {
      return {
        key: request.id,
        value: request.id,
        text: request.name,
      };
    });

    const requestFields = (currentProduct, currentSku) => {
      if (Object.keys(currentProduct).length < 1) {
        return null;
      } else {
        const { id, name, ...skusObj } = currentProduct;
        const skus = Object.keys(skusObj).map((sku) => {
          return { key: sku, value: sku, text: sku.toUpperCase() };
        });
        const skuFields = currentSku.data.map((skuField) => {
          return (
            <div key={skuField.volume}>
              <h6>Select Volume</h6>
              <Select
                placeholder="Volume"
                options={[
                  {
                    key: skuField.volume,
                    value: skuField.volume,
                    text: `${skuField.volume}ml`,
                  },
                ]}
                defaultValue={skuField.volume}
              />
              &nbsp; &nbsp;
              <Input
                type="number"
                placeholder="Quantity(Cases)"
                value={skuField.quantity}
                onChange={(e, { value }) =>
                  this.handleQuantity(value, skuField.volume)
                }
              />
              <br />
              <br />
            </div>
          );
        });
        return (
          <div key={currentSku.type}>
            {/* <Form.Input
              type="text"
              id="distributor"
              label="Distributor Developer"
              placeholder="Distributor Developer"
              onChange={this.handleChange}
              value={this.state.distributor.value}
            /> */}
            <h6>Select SKU</h6>
            <Select
              placeholder="SKU"
              options={skus}
              defaultValue={currentSku.type}
              onChange={this.handleSkuChange}
            />
            <br />
            <br />
            {skuFields}
          </div>
        );
      }
    };

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Select
            placeholder="Select product"
            options={products}
            onChange={this.handleProductChange}
          />
          <br />
          <br />
          {requestFields(this.state.currentProduct, this.state.currentSku)}
          <Button type="submit" id="button">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Request;
