import React, { useEffect } from "react";

function Container(props) {
  return <div className={"container py-md-5 " + (props.wide ? "" : "container--narrow py-md-5")}>{props.children}</div>;
}

export default Container;
