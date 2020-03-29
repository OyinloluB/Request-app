import React from "react";

import { NavLink } from "react-router-dom";

export default function Signuplink(props) {
  return (
    <div>
      <ul id="ul">
        <li id="li">
          <NavLink to={props.link} id="signup">
            Sign up as {props.text}
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
