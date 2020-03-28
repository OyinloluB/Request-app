import React, { Component } from "react";
import { Button, Progress } from "semantic-ui-react";
import Merchtable from "./Merchtable";

class Dashboard extends Component {
  state = {
    percent: 33,
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
		value3: '0',
		value4: '0',
		value5: '0',
		value6: '0',
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
		value3: '0',
		value4: '0',
		value5: '0',
		value6: '0',
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
		value3: '0',
		value4: '0',
		value5: '0',
		value6: '0',
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
		value3: '0',
		value4: '0',
		value5: '0',
		value6: '0',
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
		value3: '0',
		value4: '0',
		value5: '0',
		value6: '0',
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
		value3: '0',
		value4: '0',
		value5: '0',
		value6: '0',
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
  setUpdate = (value, name, key) => {
    const products = this.state.products;
    products.map(prod => {
      if (prod.key === key) {
        if (name === "value") {
          prod.value = value;
        } else {
          prod.value2 = value;
          prod.value3 = value;
          prod.value4 = value;
          prod.value5 = value;
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
                products={this.state.products}
                setUpdate={this.setUpdate}
              />
            </div>
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
