import React from "react";
import { Dropdown } from "semantic-ui-react";

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownExampleDropdown = props => (
  <Dropdown text={props.text}>
    <Dropdown.Menu>
      <Dropdown.Item text={props.merch} />
      <Dropdown.Item text={props.dist} />
      <Dropdown.Item text={props.admin} />
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownExampleDropdown;
