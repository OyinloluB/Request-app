import React, { Component } from "react";
import { Button, Select, Form, Input } from "semantic-ui-react";

class Request extends Component {
  state = {
    name: "",
    location: "",
    code: "",
    requests: [
      {
        id: 1,
        name: "Budweiser",
        rgb: [
          { volume: "375", quantity: 0 },
          { volume: "600", quantity: 0 }
        ],
        can: [
          { volume: "330", quantity: 0 },
          { volume: "500", quantity: 0 }
        ]
      },
      {
        id: 2,
        name: "Castle Lite",
        rgb: [
          { volume: "375", quantity: 0 },
          { volume: "600", quantity: 0 }
        ]
      },
      {
        id: 3,
        name: "Trophy Stout",
        rgb: [{ volume: "600", quantity: 0 }]
      },
      {
        id: 4,
        name: "Hero",
        rgb: [
          { volume: "375", quantity: 0 },
          { volume: "600", quantity: 0 }
        ],
        can: [
          { volume: "330", quantity: 0 },
          { volume: "500", quantity: 0 }
        ]
      },
      {
        id: 5,
        name: "Trophy",
        rgb: [
          { volume: "375", quantity: 0 },
          { volume: "600", quantity: 0 }
        ],
        can: [
          { volume: "330", quantity: 0 },
          { volume: "500", quantity: 0 }
        ]
      },
      {
        id: 6,
        name: "Eagle Lager",
        rgb: [
          { volume: "330", quantity: 0 },
          { volume: "600", quantity: 0 }
        ]
      },
      {
        id: 7,
        name: "Eagle Stout",
        rgb: [
          { volume: "330", quantity: 0 },
          { volume: "600", quantity: 0 }
        ]
      },
      {
        id: 8,
        name: "Grand Malt",
        rgb: [{ volume: "330", quantity: 0 }],
        can: [{ volume: "330", quantity: 0 }],
        pet: [
          { volume: "250", quantity: 0 },
          { volume: "330", quantity: 0 }
        ]
      },
      {
        id: 9,
        name: "Beta Malt",
        rgb: [{ volume: "330", quantity: 0 }],
        can: [{ volume: "330", quantity: 0 }],
        pet: [
          { volume: "250", quantity: 0 },
          { volume: "330", quantity: 0 }
        ]
      }
    ],
    currentProduct: {},
    currentSku: {}
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleProductChange = (e, { value }) => {
    const product = this.state.requests.filter(
      request => request.id === value
    )[0];
    const sku = { requestId: value, type: "rgb", data: product.rgb };
    this.setState({ currentProduct: { ...product }, currentSku: { ...sku } });
  };

  handleQuantity = (value, volume) => {
    const currentSkuData = this.state.currentSku.data.map(skuDataItem => {
      if (skuDataItem.volume === volume) {
        skuDataItem.quantity = value;
      }
      return skuDataItem;
    });
    this.setState(prevState => ({
      currentSku: {
        ...prevState.currentSku,
        data: [...currentSkuData]
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const quantityIsValid = this.state.currentSku.data.reduce(
      (acc, skuItem) => {
        return skuItem.quantity !== 0 && !Number(skuItem.quantity).isNaN && acc;
      },
      true
    );
    if (quantityIsValid) {
      let requestData = {
        name: this.state.name,
        location: this.state.location,
        code: this.state.code,
        brand: this.state.currentProduct.name,
        sku: this.state.currentSku.type,
        volume1: this.state.currentSku.data[0].volume,
        quantity1: Number(this.state.currentSku.data[0].quantity)
      };
      if (this.state.currentSku.data.length > 1) {
        requestData = {
          ...requestData,
          volume2: this.state.currentSku.data[1].volume,
          quantity2: Number(this.state.currentSku.data[1].quantity)
        };
      }
      console.log(requestData);
      fetch("https://ab-inbev-requestapp.herokuapp.com/Request", {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
      })
        .then(res => res.json())
        .then(data => {
          alert("Request Successful!");
          console.log(data);
        })
        .catch(err => console.log(err));
    }
  };

  handleSkuChange = (e, { value }) => {
    this.setState({
      currentSku: {
        requestId: this.state.currentProduct.id,
        type: value,
        data: [...this.state.currentProduct[value]]
      }
    });
  };

  render() {
    const products = this.state.requests.map(request => {
      return {
        key: request.id,
        value: request.id,
        text: request.name
      };
    });

    const requestFields = (currentProduct, currentSku) => {
      if (Object.keys(currentProduct).length < 1) {
        return null;
      } else {
        const { id, name, ...skusObj } = currentProduct;
        const skus = Object.keys(skusObj).map(sku => {
          return { key: sku, value: sku, text: sku.toUpperCase() };
        });
        const skuFields = currentSku.data.map(skuField => {
          return (
            <div key={skuField.volume}>
              <h6>Select Volume</h6>
              <Select
                placeholder="Volume"
                options={[
                  {
                    key: skuField.volume,
                    value: skuField.volume,
                    text: `${skuField.volume}ml`
                  }
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
            <Form.Input
              type="text"
              id="name"
              label="Name"
              placeholder="Name"
              onChange={this.handleChange}
              // value={this.state.name.value}
            />

            <Form.Input
              type="text"
              id="location"
              label="Location"
              placeholder="Location"
              onChange={this.handleChange}
              // value={this.state.location.value}
            />
            <Form.Input
              type="text"
              id="code"
              label="Code"
              placeholder="Station Code"
              onChange={this.handleChange}
              // value={this.state.code.value}
            />
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
