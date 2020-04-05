import React, {Component} from "react";
import Merchtable from "../Merchandiser/Merchtable";

class DistributorStockLevel extends Component {
	state = {
		error: null,
		isLoaded: false,
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
			return {name: brand, data: uniqueProductData};
		});
		return result;
	};
    
	render() {
		return <Merchtable products={this.state.products} />;
	}
}

export default DistributorStockLevel;
