import React from "react";
import { Dropdown } from "semantic-ui-react";


const DropdownBar = props => (
  <Dropdown text={props.text}>
    <Dropdown.Menu id="position">
      <Dropdown.Item text={props.merch} />
      <Dropdown.Item text={props.dist} />
      <Dropdown.Item text={props.admin} />
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownBar;
