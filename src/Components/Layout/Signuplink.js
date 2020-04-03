import React from "react";

import { NavLink } from "react-router-dom";

export default function Signuplink(props) {
  return (
    <div>
      <ul id="ul">
        <li id="li">
          <NavLink to={props.link} id="signup">
            {props.text}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
