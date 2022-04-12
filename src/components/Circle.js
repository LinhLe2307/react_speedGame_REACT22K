import React from "react";

const Circle = (props) => {
  return (
    <div className="circle" onClick={props.click}>
      {props.id}
    </div>
  );
};

export default Circle;
