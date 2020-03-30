import React from "react";

import logo from "../../Assets/ibplc logo.png";
import Dropdown from "./Dropdown";
import Signinlink from "./Signinlink";
import Signuplink from "./Signuplink";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="ui secondary menu" id="ui-nav">
        <img src={logo} alt="company logo" id="logo-image" />
        <div className="right menu" id="right-menu">
          <a className="item" id="item">
            <Dropdown
              text={"Sign in"}
              merch={<Signinlink text={"merchandiser"} link={"/signinmerch"} />}
              dist={<Signinlink text={"distributor"} link={"/signindist"} />}
              admin={<Signinlink text={"admin"} link={"/signinadmin"} />}
            />
          </a>
          <a className="item" id="item">
            <Dropdown
              text={"Sign up"}
              merch={<Signuplink text={"merchandiser"} link={"/signupmerch"} />}
              dist={<Signuplink text={"distributor"} link={"/signupdist"} />}
              admin={<Signuplink text={"admin"} link={"/signupadmin"} />}
            />
          </a>
          <a className="active item" id="active">
            <Link to="/" id="home">
              Home
            </Link>
          </a>
        </div>
      </div>
    </div>
  );
}
