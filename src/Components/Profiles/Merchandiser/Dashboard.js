import React, { Component } from "react";
import { Progress, Button } from "semantic-ui-react";
import Merchtable from "../Merchandiser/Merchtable";

class Dashboard extends Component {
  state = {
    percent: 33,
    dynamicProducts: [],
    products: [
      {
        name: "Budweiser",
        mlone: "375ml (rgb)",
        mltwo: "600ml (rgb)",
        mlthree: "330ml (can)",
        mlfour: "500ml (can)",
        mlfive: "-",
        mlsix: "-",
        value: "0",
        value2: "0",
        value3: "0",
        value4: "0",
        value5: "0",
        value6: "0",
        key: "1"
      },
      {
        name: "Castle Lite",
        mlone: "375ml (rgb)",
        mltwo: "600ml (rgb)",
        mlthree: "-",
        mlfour: "-",
        mlfive: "-",
        mlsix: "-",
        value: "0",
        value2: "0",
        value3: "0",
        value4: "0",
        value5: "0",
        value6: "0",
        key: "2"
      },
      {
        name: "Beta Malt",
        mlone: "330ml (rgb)",
        mltwo: "600ml (rgb)",
        mlthree: "330ml (can)",
        mlfour: "-",
        mlfive: "250ml (pet)",
        mlsix: "330ml (pet)",
        value: "0",
        value2: "0",
        value3: "0",
        value4: "0",
        value5: "0",
        value6: "0",
        key: "3"
      },
      {
        name: "Hero",
        mlone: "375ml (rgb)",
        mltwo: "600ml (rgb)",
        mlthree: "330ml (can)",
        mlfour: "500ml (can)",
        mlfive: "-",
        mlsix: "-",
        value: "0",
        value2: "0",
        value3: "0",
        value4: "0",
        value5: "0",
        value6: "0",
        key: "4"
      },
      {
        name: "Grand Malt",
        mlone: "375ml (rgb)",
        mltwo: "600ml (rgb)",
        mlthree: "330ml (can)",
        mlfour: "-",
        mlfive: "250ml (pet)",
        mlsix: "330ml (pet)",
        value: "0",
        value2: "0",
        value3: "0",
        value4: "0",
        value5: "0",
        value6: "0",
        key: "5"
      },
      {
        name: "Trophy Stout",
        mlone: "-",
        mltwo: "600ml (rgb)",
        mlthree: "-",
        mlfour: "-",
        mlfive: "-",
        mlsix: "-",
        value: "0",
        value2: "0",
        value3: "0",
        value4: "0",
        value5: "0",
        value6: "0",
        key: "6"
      },
      {
        name: "Trophy",
        mlone: "375ml (rgb)",
        mltwo: "600ml (rgb)",
        mlthree: "330ml (can)",
        mlfour: "500ml (can)",
        mlfive: "-",
        mlsix: "-",
        value: "0",
        value2: "0",
        key: "7"
      },
      {
        name: "Eagle Lager",
        mlone: "330ml (rgb)",
        mltwo: "600ml (rgb)",
        mlthree: "-",
        mlfour: "-",
        mlfive: "-",
        mlsix: "-",
        value: "0",
        value2: "0",
        key: "8"
      },
      {
        name: "Eagle Stout",
        mlone: "330ml (rgb)",
        mltwo: "600ml (rgb)",
        mlthree: "-",
        mlfour: "-",
        mlfive: "-",
        mlsix: "-",
        value: "0",
        value2: "0",
        key: "9"
      }
    ]
  };

  componentDidMount() {
    fetch("https://ab-inbev-requestapp.herokuapp.com/stockLevel", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(data => {
        const brands = Array.from(new Set(data.map(req => req.brand)));
        const result = brands.map(brand => {
          const brandReqs = data.filter(req => req.brand === brand);
          const reqSkus = [];
          brandReqs.forEach(brandReq => {
            if(brandReq.volume1){
              reqSkus.push({ skuVol: `${brandReq.volume1} (${brandReq.sku})`, quantity: brandReq.quantity1 });
            }
            if(brandReq.volume2){
              reqSkus.push({ skuVol: `${brandReq.volume2} (${brandReq.sku})`, quantity: brandReq.quantity2 });
            }
          });
          return { name: brand, data: [...reqSkus] };
        });
        console.log(result);
       this.setState({
         dynamicProducts: result
       });
      })
      .catch(err => console.log(err));
  }



  setUpdate = (value, name, key) => {
    const products = this.state.products;
    products.map(prod => {
      if (prod.key === key) {
        if (name === "value") {
          prod.value = value;
        } else if (name === "value2") {
          prod.value2 = value;
        } else if (name === "value3") {
          prod.value3 = value;
        } else if (name === "value4") {
          prod.value4 = value;
        } else if (name === "value5") {
          prod.value5 = value;
        } else {
          prod.value6 = value;
        }
      }
    });
    this.setState({
      products: products
    });
  };
  increment = () =>
    this.setState(prevState => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent + 20
    }));

  render() {
    return (
      <div class="ui container" id="container">
        <div id="content-container">
          <div id="stockvalues">
            <h6>STOCK VALUES IN CRATES</h6>
            <p>Click value to edit</p>
            <div id="merchtable">
              <Merchtable
                products={this.state.dynamicProducts}
                setUpdate={this.setUpdate}
              />
            </div>
            <button id="button">Submit</button>
          </div>
          <div id="bar">
            <h6>Latest request status</h6>
            <div id="progress-bar">
              <Progress id="progress" percent={this.state.percent} indicating />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
