import React from "react";

const Button = (props) => {
  return (
    <button type={props.type || "button"} onClick={props.click}>
      <h3>{props.children}</h3>
    </button>
  );
};

export default Button;
