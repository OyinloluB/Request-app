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
          {prod.data.map((skuVolData,index) => (
            <Table.Row>
            {index === 0 ? <Table.Cell rowSpan={prod.data.length}>{prod.name}</Table.Cell> : null}
            <Table.Cell>{skuVolData.skuVol}</Table.Cell>
            <Table.Cell className="dashboard-value">
              <input
                type="text"
                className="editstock"
                id={`${skuVolData.skuVol}-${index}`}
                value={skuVolData.quantity}
                name="value"
                onChange={e => {
                  //props.setUpdate(e.target.value, e.target.name, prod.key);
                }}
              />
            </Table.Cell>
          </Table.Row>
          ))}
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
