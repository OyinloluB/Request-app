import React from "react";
import {Table} from "semantic-ui-react";

export default function Merchtable(props) {
	return (
		<Table celled structured id="stocktable">
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell rowSpan="2">Brand</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">RGB/CAN/PET</Table.HeaderCell>
					<Table.HeaderCell rowSpan="2">Value</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			{props.products.map((prod) => (
				<Table.Body>
					{prod.data.map((skuVolData, index) => (
						<Table.Row>
							{index === 0 ? (
								<Table.Cell rowSpan={prod.data.length}>{prod.name}</Table.Cell>
							) : null}
							<Table.Cell>{`${skuVolData.volume}ml (${skuVolData.sku})`}</Table.Cell>
							<Table.Cell className="dashboard-value">
								<input
									type="number"
									min="0"
									className="editstock"
									id={`${skuVolData.name}-${skuVolData.volume}`}
									defaultValue={skuVolData.quantity}
									name="value"
									onChange={(e) =>
										props.handleQuantityChange(e, {
											brand: prod.name,
											sku: skuVolData.sku,
											volume: skuVolData.volume,
										})
									}
								/>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			))}
		</Table>
	);
}
