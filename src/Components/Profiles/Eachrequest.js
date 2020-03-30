import React from "react";
import { List } from "semantic-ui-react";
import FlipMove from "react-flip-move";

export default function Eachrequest(props) {
  const request = props.request;
  const requestList = request.map(req => {
    return (
      <div id="makerequest" className="list" key={req.key}>
        <p>
          <input
            type="text"
            id={req.key}
            value={req.product}
            onChange={e => {
              props.setUpdate(e.target.value, req.key);
            }}
          />
          <span className="close" onClick={() => props.deleteRequest(req.key)}>
            x
          </span>
        </p>
      </div>
    );
  });
  return (
    <div className="container" id="makerequest">
      <p>Click order to edit...</p>
      <List>
        <List.Item>
          <FlipMove duration={500} easing="ease-in-out">
            {requestList}
          </FlipMove>
        </List.Item>
      </List>
    </div>
  );
}
