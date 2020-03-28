import React, { Component } from "react";
import { Input, Button, Form } from "semantic-ui-react";
import Eachrequest from "./Eachrequest";

class Makerequest extends Component {
	state = {
		request: [],
		currentRequest: {
			product: "",
			rgb: "",
			pet: "",
			can: "",
			quantity: "",
			key: ""
		}
	};
	handleChange = e => {

		//You want to know which input is calling handleChange

		let currentRequest = this.state.currentRequest;

		currentRequest[e.target.name] = e.target.value;

		this.setState({
			currentRequest: currentRequest
		})

	};


	handleSubmit = event => {
		event.preventDefault();
		const newReq = this.state.currentRequest;
		console.log(newReq);
		if (
			newReq.product ||
			newReq.rgb ||
			newReq.pet ||
			newReq.can ||
			newReq.quantity !== ""
		) {
			const request = [...this.state.request, newReq];

			this.setState({
				request: request,
				currentRequest: {
					product: "",
					rgb: "",
					pet: "",
					can: "",
					quantity: "",
					key: ""
				}
			});
		}
	};
	deleteRequest = key => {
		const filteredRequest = this.state.request.filter(req => req.key !== key);
		this.setState({
			request: filteredRequest
		});
	};
	setUpdate = (product, key) => {
		const requests = this.state.request;
		requests.map(req => {
			if (req.key === key) {
				req.product = product;
			}
		});
		this.setState({
			request: requests
		});
	};
	render() {
		return (
			<div class="ui container" id="container">
				<Eachrequest
					request={this.state.request}
					deleteRequest={this.deleteRequest}
					setUpdate={this.setUpdate}
				/>

				<Form onSubmit={this.handleSubmit}>
					<div id="selectprod">
						<h6>Select Product</h6>
						<Input
							id="input"
							name="product"
							list="products"
							onChange={this.handleChange}
							placeholder="Select Products..."
						/>
						<datalist id="products">
							<option value="Budweiser" />
							<option value="Castle Light" />
							<option value="Hero Large" />
						</datalist>
            &nbsp;&nbsp;
            <Input
							id="prod-no"
							name="quantity"
							onChange={this.handleChange}
							placeholder="Input Value..."
						/>
						<div id="measurement">
							<Input
								id="rgb"
								list="rgb"
								name="rgb"
								onChange={this.handleChange}
								placeholder="RGB"
							/>
							<datalist id="rgb">
								<option value="375ml" />
								<option value="330ml" />
								<option value="600ml" />
							</datalist>
              &nbsp;&nbsp;
              <Input
								id="can"
								onChange={this.handleChange}
								name="can"
								list="can"
								placeholder="CAN"
							/>
							<datalist id="can">
								<option value="330ml" />
								<option value="500ml" />
							</datalist>
              &nbsp;&nbsp;
              <Input
								id="pet"
								onChange={this.handleChange}
								name="pet"
								list="pet"
								placeholder="PET"
							/>
							<datalist id="pet">
								<option value="250ml" />
								<option value="330ml" />
							</datalist>
						</div>
					</div>
					<Button id="button">Submit</Button>
				</Form>
			</div>
		);
	}
}

export default Makerequest;

{
  /* <Form onSubmit={this.handleSubmit}>
<div id="selectprod">
    <h6>Select Product</h6>
    <Input id="input" name='product' list='products' onChange={this.handleChange} placeholder='Select Products...' />
    <datalist id='products'>
        <option value='Budweiser' />
        <option value='Castle Light' />
        <option value='Hero Large' />
    </datalist>
&nbsp;&nbsp;
<Input id="prod-no" name='value' onChange={this.handleChange} placeholder='Input Value...' />
    <div id="measurement">
        <Input id="input" list='rgb' name='rgb' onChange={this.handleChange} placeholder='RGB' />
        <datalist id='rgb'>
            <option value='375ml' />
            <option value='330ml' />
            <option value='600ml' />
        </datalist>
&nbsp;&nbsp;
<Input id="input" onChange={this.handleChange} name='can' list='can' placeholder='CAN' />
        <datalist id='can'>
            <option value='330ml' />
            <option value='500ml' />
        </datalist>
&nbsp;&nbsp;
<Input id="input" onChange={this.handleChange} name='pet' list='pet' placeholder='PET' />
        <datalist id='pet'>
            <option value='250ml' />
            <option value='330ml' />
        </datalist>
    </div>
</div>
<Button id="button">Submit</Button>
</Form> */
}
