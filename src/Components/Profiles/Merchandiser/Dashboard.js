import React, { Component } from "react";
import { Progress, Button } from "semantic-ui-react";
import Merchtable from "../Merchandiser/Merchtable";

class Dashboard extends Component {
  state = {
    // percent: 33,
    serverProds: [],
    products: [],
  };
  componentDidMount() {
    fetch("https://ab-inbev-requestapp.herokuapp.com/stockLevel", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const brands = Array.from(new Set(data.map((req) => req.brand)));
        this.setState({
          products: [...this.createProductsList(data, brands)],
          serverProds: [...this.createProductsList(data, brands)],
        });
      })
      .catch((err) => console.log(err));
  }

  createProductsList = (data, brands) => {
    const result = brands.map((brand) => {
      const brandReqs = data.filter((req) => req.brand === brand);
      const reqSkus = [];
      brandReqs.forEach((brandReq) => {
        if (brandReq.volume1) {
          const vol1 = Number(brandReq.volume1.slice(0, -2));
          reqSkus.push(
            JSON.stringify({
              volume: vol1,
              sku: brandReq.sku,
              quantity: brandReq.quantity1,
              volNo: 1,
            })
          );
        }
        if (brandReq.volume2) {
          const vol2 = Number(brandReq.volume2.slice(0, -2));
          reqSkus.push(
            JSON.stringify({
              volume: vol2,
              sku: brandReq.sku,
              quantity: brandReq.quantity2,
              volNo: 2,
            })
          );
        }
      });
      const uniqueProductData = Array.from(new Set(reqSkus)).map(JSON.parse);
      return { name: brand, data: uniqueProductData };
    });
    return result;
  };

  handleQuantityChange = (e, { brand, sku, volume }) => {
    const newQuantity = e.target.value;
    const updatedProducts = [...this.state.products];
    const productIndex = updatedProducts.findIndex(
      (prod) => prod.name === brand
    );
    const product = updatedProducts[productIndex];
    product.data = [
      ...product.data.map((dataItem) => {
        if (dataItem.sku === sku && dataItem.volume === volume) {
          dataItem.quantity = Number(newQuantity);
        }
        return dataItem;
      }),
    ];
    updatedProducts[productIndex] = product;
    this.setState({
      products: [...updatedProducts],
    });
  };

  generateReqData = () => {
    const requestsData = [];
    const changedSkus = [];
    const { serverProds, products } = this.state;
    products.forEach((prod, prodIndex) => {
      const changedData = [];
      const serverProd = serverProds[prodIndex];
      prod.data.forEach((dataItem, dIndex) => {
        const serverDataItem = serverProd.data[dIndex];
        if (dataItem.quantity !== serverDataItem.quantity) {
          changedSkus.push(dataItem.sku);
          changedData.push({
            sku: dataItem.sku,
            [`volume${dataItem.volNo}`]: dataItem.volume,
            [`quantity${dataItem.volNo}`]: dataItem.quantity,
          });
        }
      });
      changedSkus.forEach((sku) => {
        const skusData = prod.data.filter((data) => data.sku === sku);
        const vol1Info = skusData.filter((data) => data.volNo === 1)[0];
        const vol2Info = skusData.filter((data) => data.volNo === 2)[0];
        const changedSkusData = changedData.filter((data) => data.sku === sku);
        changedSkusData.forEach((skuData) => {
          let reqData = {
            brand: prod.name,
            sku: sku,
            volume1:
              skuData.volume1 !== undefined
                ? `${skuData.volume1}ml`
                : `${vol1Info.volume}ml`,
            quantity1:
              skuData.quantity1 !== undefined
                ? skuData.quantity1
                : vol1Info.quantity,
          };
          if (vol2Info) {
            reqData = {
              ...reqData,
              volume2:
                skuData.volume2 !== undefined
                  ? `${skuData.volume2}ml`
                  : `${vol2Info.volume}ml`,
              quantity2:
                skuData.quantity2 !== undefined
                  ? skuData.quantity2
                  : vol2Info.quantity,
            };
          }
          requestsData.push(reqData);
        });
      });
    });
    return requestsData;
  };

  handleSubmit = () => {
    const requestsData = this.generateReqData();
    const updateStockLevels = requestsData.map((reqData) => {
      return fetch("https://ab-inbev-requestapp.herokuapp.com/stockLevel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Stocks updated!");
        });
    });

    Promise.all(updateStockLevels)
      .then(() => {
        return fetch("https://ab-inbev-requestapp.herokuapp.com/Stocklevel", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      })
      .then((data) => {
        const brands = Array.from(new Set(data.map((req) => req.brand)));
        this.setState({
          products: [...this.createProductsList(data, brands)],
          serverProds: [...this.createProductsList(data, brands)],
        });
      })
      .catch((err) => console.log(err));
  };

  increment = () =>
    this.setState((prevState) => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent + 20,
    }));

  render() {
    return (
      <div className="ui container" id="container">
        <div id="content-container">
          <div id="stockvalues">
            <h6>STOCK CASES IN CRATES</h6>
            <p>Click cases to edit</p>
            <div id="merchtable">
              <Merchtable
                products={this.state.products}
                handleQuantityChange={this.handleQuantityChange}
              />
            </div>
            <Button id="button" onClick={this.handleSubmit}>
              Update
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
