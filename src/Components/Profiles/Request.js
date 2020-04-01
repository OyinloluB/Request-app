import React, { Component } from "react";
import { Button, Select, Form, Input } from "semantic-ui-react";

class Request extends Component {
  state = {
    stuff: [
      { key: "af", value: "af", text: "Afghanistan" },
      { key: "ax", value: "ax", text: "Aland Islands" },
      { key: "al", value: "al", text: "Albania" },
      { key: "dz", value: "dz", text: "Algeria" },
      { key: "as", value: "as", text: "American Samoa" },
      { key: "ad", value: "ad", text: "Andorra" },
      { key: "ao", value: "ao", text: "Angola" },
      { key: "ai", value: "ai", text: "Anguilla" },
      { key: "ag", value: "ag", text: "Antigua" },
      { key: "ar", value: "ar", text: "Argentina" },
      { key: "am", value: "am", text: "Armenia" },
      { key: "aw", value: "aw", text: "Aruba" },
      { key: "au", value: "au", text: "Australia" },
      { key: "at", value: "at", text: "Austria" },
      { key: "az", value: "az", text: "Azerbaijan" },
      { key: "bs", value: "bs", text: "Bahamas" },
      { key: "bh", value: "bh", text: "Bahrain" },
      { key: "bd", value: "bd", text: "Bangladesh" },
      { key: "bb", value: "bb", text: "Barbados" },
      { key: "by", value: "by", text: "Belarus" },
      { key: "be", value: "be", text: "Belgium" },
      { key: "bz", value: "bz", text: "Belize" },
      { key: "bj", value: "bj", text: "Benin" }
    ],
    requests: [
      {
        id: 1,
        name: "Budweiser",
        rgb: [375, 600],
        can: [330, 500]
      },
      {
        id: 2,
        name: "Castle Lite",
        rgb: [375, 600]
      },
      {
        id: 3,
        name: "Trophy Stout",
        rgb: [600]
      },
      {
        id: 4,
        name: "Hero",
        rgb: [375, 600],
        can: [330, 500]
      },
      {
        id: 5,
        name: "Trophy",
        rgb: [375, 600],
        can: [330, 500]
      },
      {
        id: 6,
        name: "Eagle Lager",
        rgb: [330, 600]
      },
      {
        id: 7,
        name: "Eagle Stout",
        rgb: [330, 600]
      },
      {
        id: 8,
        name: "Grand Malt",
        rgb: [330],
        can: [330],
        pet: [250, 330]
      },
      {
        id: 9,
        name: "Beta Malt",
        rgb: [330],
        can: [330],
        pet: [250, 330]
      }
    ],
    currentProduct: {}
  };

  handleProductChange = (e) => {
    const product = this.state.filter(request => request.id === e.target.value)[0];
    this.setState({currentProduct: {...product}});
  }

  render() {
    const products = this.state.requests.map(request => {
        return {
            key: request.id,
            value: request.id,
            text: request.name
        }
    });

    const requestFields = (currentProduct) => {
        if(Object.keys(this.state.currentProduct).length < 1){
            return null;
        } e{}
        return (
              <Select placeholder="SKU" options={this.state.stuff} />
          <br />
          <br />
          <Select placeholder="Volume" options={this.state.stuff} />
          &nbsp;
          <Input placeholder="Quantity..." />
          <br />
          <br />
          <Select placeholder="Volume" options={this.state.stuff} />
          &nbsp;
          <Input placeholder="Quantity..." />
          <br />
          <br />
          <Select placeholder="Volume" options={this.state.stuff} />
          &nbsp;
          <Input placeholder="Quantity..." />
          <br />
          <br />
         );
    }

    return (
      <div>
        <Form>
          <Select placeholder="Select product" options={products} onChanged={this.handleProductChange} />
          <br />
          <br />
          <Button type="submit" id="button">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Request;
