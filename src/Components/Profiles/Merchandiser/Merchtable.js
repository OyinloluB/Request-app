import React from "react";
import { Table } from "semantic-ui-react";

export default function Merchtable(props) {
  const buildInput = (brand, skuVolData) => {
    if (!props.handleQuantityChange) {
      return (
        <input
          type="number"
          min="0"
          className="editstock"
          id={`${skuVolData.name}-${skuVolData.volume}`}
          value={skuVolData.quantity}
          name="value"
        />
      );
    } else {
      return (
        <input
          type="number"
          min="0"
          className="editstock"
          id={`${skuVolData.name}-${skuVolData.volume}`}
          defaultValue={skuVolData.quantity}
          name="value"
          onChange={(e) =>
            props.handleQuantityChange(e, {
              brand: brand,
              sku: skuVolData.sku,
              volume: skuVolData.volume,
            })
          }
        />
      );
    }
  };

  return (
    <Table celled structured unstackable id="stocktable">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan="2">Brand</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2"></Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">RGB/CAN/PET3</Table.HeaderCell>
          <Table.HeaderCell rowSpan="2">Cases</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {props.products.map((prod, index) => (
        <Table.Body key={index}>
          {prod.data.map((skuVolData, index) => (
            <Table.Row key={index}>
              {index === 0 ? (
                <>
                  <Table.Cell rowSpan={prod.data.length}>
                    {prod.name}
                  </Table.Cell>
                  <Table.Cell rowSpan={prod.data.length}>
                    <img src={prod.image} alt="product" />
                  </Table.Cell>
                </>
              ) : null}
              <Table.Cell>{`${skuVolData.volume}ml (${skuVolData.sku})`}</Table.Cell>
              <Table.Cell className="dashboard-value">
                {buildInput(prod.name, skuVolData)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      ))}
    </Table>
  );
}
