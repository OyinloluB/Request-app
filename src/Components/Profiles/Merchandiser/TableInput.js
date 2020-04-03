import React from "react";
import { Table } from "semantic-ui-react";

const TableInput = () => (
  <Table celled fixed singleLine>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Brand</Table.HeaderCell>
        <Table.HeaderCell>RGB</Table.HeaderCell>
        <Table.HeaderCell>CAN</Table.HeaderCell>
        <Table.HeaderCell>PET</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Budweiser</Table.Cell>
        <Table.Cell>375ml, 600ml</Table.Cell>
        <Table.Cell>330ml, 600ml</Table.Cell>
        <Table.Cell> - </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Castle Lite</Table.Cell>
        <Table.Cell>375ml, 600ml</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Trophy Stout</Table.Cell>
        <Table.Cell> 600ml</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Hero</Table.Cell>
        <Table.Cell>375ml, 600ml</Table.Cell>
        <Table.Cell>330ml, 500ml</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Trophy</Table.Cell>
        <Table.Cell>375ml, 600ml</Table.Cell>
        <Table.Cell>330ml, 500ml</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Eagle Lager</Table.Cell>
        <Table.Cell> 330ml, 600ml</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Eagle Stout</Table.Cell>
        <Table.Cell> 330ml, 600ml</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Grand Malt</Table.Cell>
        <Table.Cell> 330ml</Table.Cell>
        <Table.Cell>330ml</Table.Cell>
        <Table.Cell>250ml, 330ml</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Beta Malt</Table.Cell>
        <Table.Cell> 330ml</Table.Cell>
        <Table.Cell>330ml</Table.Cell>
        <Table.Cell>250ml, 330ml</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default TableInput;
