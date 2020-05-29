import React, { Component } from "react";
import { Button, Select, Form, Input } from "semantic-ui-react";
import BudCan330 from "../../../Assets/sku/BudCan330.png";
import BudCan500 from "../../../Assets/sku/BudCan.png";
import BudRgb from "../../../Assets/sku/BudRGB.png";
import CastleLite from "../../../Assets/sku/CastleLite.png";
import Hero from "../../../Assets/sku/HeroRGB.png";
import Trophy from "../../../Assets/sku/TrophyRGB.png";
import Trophy330 from "../../../Assets/sku/Trophy330.png";
import Trophy500 from "../../../Assets/sku/TrophyCan.png";
import EagleLager from "../../../Assets/sku/EagleLagerRGB.png";
import EagleLager330 from "../../../Assets/sku/EagleLager330.png";
import EagleXtra330 from "../../../Assets/sku/EagleXtra330.png";
import EagleXtra from "../../../Assets/sku/EagleXtraRGB.png";
import BetaRgb from "../../../Assets/sku/BetaRGB.png";
import BetaPet from "../../../Assets/sku/BetaPET.png";
import BetaCan from "../../../Assets/sku/BetaCan.png";
import Grand250 from "../../../Assets/sku/GrandMaltPET.png";
import Grand330 from "../../../Assets/sku/GrandMaltPet330.png";
import GrandRGB from "../../../Assets/sku/GrandMaltRGB.png";
import GrandCAN from "../../../Assets/sku/GrandMaltCan.png";
import "./request.css";

class Request extends Component {
  state = {
    // distributor: "",
    requests: [
      {
        id: 1,
        name: "Budweiser",
        rgb: [
          { volume: "375", quantity: "", image: "" },
          { volume: "600", quantity: "", image: BudRgb },
        ],
        can: [
          { volume: "330", quantity: "", image: BudCan330 },
          { volume: "500", quantity: "", image: BudCan500 },
        ],
      },
      {
        id: 2,
        name: "Castle Lite",
        rgb: [
          { volume: "375", quantity: "", image: CastleLite },
          { volume: "600", quantity: "", image: "" },
        ],
      },
      {
        id: 3,
        name: "Trophy Stout",
        rgb: [{ volume: "600", quantity: "", image: "" }],
      },
      {
        id: 4,
        name: "Hero",
        rgb: [
          { volume: "375", quantity: "", image: "" },
          { volume: "600", quantity: "", image: Hero },
        ],
        can: [
          { volume: "330", quantity: "", image: "" },
          { volume: "500", quantity: "", image: "" },
        ],
      },
      {
        id: 5,
        name: "Trophy",
        rgb: [
          { volume: "375", quantity: "", image: "" },
          { volume: "600", quantity: "", image: Trophy },
        ],
        can: [
          { volume: "330", quantity: "", image: Trophy330 },
          { volume: "500", quantity: "", image: Trophy500 },
        ],
      },
      {
        id: 6,
        name: "Eagle Lager",
        rgb: [
          { volume: "330", quantity: "", image: EagleLager330 },
          { volume: "600", quantity: "", image: EagleLager },
        ],
      },
      {
        id: 7,
        name: "Eagle Stout",
        rgb: [
          { volume: "330", quantity: "", image: EagleXtra330 },
          { volume: "600", quantity: "", image: EagleXtra },
        ],
      },
      {
        id: 8,
        name: "Grand Malt",
        rgb: [{ volume: "330", quantity: "", image: Grand330 }],
        can: [{ volume: "330", quantity: "", image: GrandCAN }],
        pet: [
          { volume: "250", quantity: "", image: Grand250 },
          { volume: "330", quantity: "", image: GrandRGB },
        ],
      },
      {
        id: 9,
        name: "Beta Malt",
        rgb: [{ volume: "330", quantity: "", image: BetaRgb }],
        can: [{ volume: "330", quantity: "", image: BetaCan }],
        pet: [
          { volume: "250", quantity: "", image: BetaPet },
          { volume: "330", quantity: "", image: BetaPet },
        ],
      },
    ],
    currentProduct: {},
    currentSku: { data: [] },
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
          name: this.props.user.merchandiser.name,
          location: this.props.user.merchandiser.location,
          code: this.props.user.merchandiser.code,
          distributor: this.props.user.merchandiser.distributor,
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
        <Form onSubmit={this.handleSubmit} className="request">
          <div>
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
          </div>
          <div>
            {this.state.currentSku.data.map((skuField) => {
              if (skuField.image !== "") {
                return (
                  <img
                    width="100px"
                    src={skuField.image}
                    alt={`${this.state.currentProduct.name} ${skuField.volume}ml`}
                  />
                );
              }
            })}
          </div>
        </Form>
      </div>
    );
  }
}

export default Request;
