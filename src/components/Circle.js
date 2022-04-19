import React from "react";

const Circle = (props) => {
  return (
    <div
      style={{
        pointerEvents: props.disabled ? "auto" : "none",
        backgroundColor: props.color,
      }} // because this is only one property, it is easier to do inline style
      className={`circle ${props.active ? "active" : ""} `}
      onClick={props.click}
    >
      {/* {props.id} */}
    </div>
  );
};

export default Circle;
