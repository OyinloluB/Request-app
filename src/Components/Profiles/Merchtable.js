import React from "react";
import { Table } from "semantic-ui-react";

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

      {props.products.map(prod => (
        <Table.Body>
          <Table.Row>
            <Table.Cell rowSpan="6">{prod.name}</Table.Cell>
            <Table.Cell>{prod.mlone}</Table.Cell>
            <Table.Cell className="dashboard-value">
              <input
                type="text"
                className="editstock"
                id={prod.key}
                value={prod.value}
                name="value"
                onChange={e => {
                  props.setUpdate(e.target.value, e.target.name, prod.key);
                }}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{prod.mltwo}</Table.Cell>
            <Table.Cell className="dashboard-value">
              <input
                type="text"
                className="editstock"
                id={prod.key}
                value={prod.value2}
                name="value2"
                onChange={e => {
                  props.setUpdate(e.target.value, e.target.name, prod.key);
                }}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{prod.mlthree}</Table.Cell>
            <Table.Cell className="dashboard-value">
              <input
                type="text"
                className="editstock"
                id={prod.key}
                value={prod.value3}
                name="value3"
                onChange={e => {
                  props.setUpdate(e.target.value, e.target.name, prod.key);
                }}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{prod.mlfour}</Table.Cell>
            <Table.Cell className="dashboard-value">
              <input
                type="text"
                className="editstock"
                id={prod.key}
                value={prod.value4}
                name="value4"
                onChange={e => {
                  props.setUpdate(e.target.value, e.target.name, prod.key);
                }}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{prod.mlfive}</Table.Cell>
            <Table.Cell className="dashboard-value">
              <input
                type="text"
                className="editstock"
                id={prod.key}
                value={prod.value5}
                name="value5"
                onChange={e => {
                  props.setUpdate(e.target.value, e.target.name, prod.key);
                }}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{prod.mlsix}</Table.Cell>
            <Table.Cell className="dashboard-value">
              <input
                type="text"
                className="editstock"
                id={prod.key}
                value={prod.value6}
                name="value6"
                onChange={e => {
                  props.setUpdate(e.target.value, e.target.name, prod.key);
                }}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      ))}
    </Table>
  );
}

// <Table basic='very' celled collapsing>
//     <Table.Header>
//         <Table.Row>
//             <Table.HeaderCell>Product</Table.HeaderCell>
//             <Table.HeaderCell>Stock Level</Table.HeaderCell>
//         </Table.Row>
//     </Table.Header>

//     <Table.Body>
//         {props.products.map(prod => (
//             <Table.Row>
//                 <Table.Cell key={prod.name}>
//                     <Header as='h4'>
//                         <Header.Content>
//                             {prod.name}
//                         </Header.Content>
//                     </Header>
//                 </Table.Cell>
//                 <Table.Cell className="dashboard-value">
//                     <input type="text"
//                     id={prod.key}
//                     value={prod.value}
//                     onChange={(e) => {
//                         props.setUpdate(e.target.value, prod.key)
//                     }} />
//                 </Table.Cell>
//             </Table.Row>
//         ))}

//     </Table.Body>
// </Table>
