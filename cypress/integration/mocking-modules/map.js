import React from "react";

export default function Map(props) {
  return (
    <div>Real map component at {props.center.lat}:{props.center.long}</div>
  );
}
