import React, {Component} from "react";
import {Table, Button} from "semantic-ui-react";

class Distributordata extends Component {
	state = {
		error: null,
		isLoaded: false,
		items: [],
	};

	componentDidMount() {
		fetch("https://ab-inbev-requestapp.herokuapp.com/Distributor", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((result) => {
				this.setState({
					isLoaded: true,
					items: result
				});
			})
			.catch((error) => {
				this.setState({
					isLoaded: true,
					error,
				});
			});
  }
  
  goToStockLevel = () => {
    this.props.history.push('/distributor/stock-level');
  }

	render() {
		return (
			<Table unstackable singleLine>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>View Stock</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{this.state.items.map(item => (
            <Table.Row key={item._id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.location}</Table.Cell>
              <Table.Cell>
                <Button icon="eye" onClick={this.goToStockLevel} />
              </Table.Cell>
            </Table.Row>
          ))}
				</Table.Body>
			</Table>
		);
	}
}

export default Distributordata;
