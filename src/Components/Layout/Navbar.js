import React from "react";

import logo from "../../Assets/ibplc logo.png";
import Dropdown from "./Dropdown";
import Signinlink from "./Signinlink";
import Signuplink from "./Signuplink";
import {Link} from "react-router-dom";

export default function Navbar() {
	return (
		<div>
			<div className="ui secondary menu" id="ui-nav">
				<img src={logo} alt="company logo" id="logo-image" />
				<div className="right menu" id="right-menu">
					<div className="item">
						<Dropdown
							text={"SIGN IN"}
							merch={<Signinlink text={"Merchandiser"} link={"/signinmerch"} />}
							dist={
								<Signinlink
									text={"Distributor Developer"}
									link={"/signindist"}
								/>
							}
							admin={<Signinlink text={"Admin"} link={"/signinadmin"} />}
						/>
					</div>
					<div className="item">
						<Dropdown
							text={"SIGN UP"}
							merch={<Signuplink text={"Merchandiser"} link={"/signupmerch"} />}
							dist={
								<Signuplink
									text={"Distributor Developer"}
									link={"/signupdist"}
								/>
							}
							admin={<Signuplink text={"Admin"} link={"/signupadmin"} />}
						/>
					</div>
					<Link to="/" className="active item" id="active">
						HOME
					</Link>
				</div>
			</div>
		</div>
	);
}
