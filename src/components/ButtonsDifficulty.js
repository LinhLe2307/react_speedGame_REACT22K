import React from "react";
// import Button from "./Button";

const OpeningPage = (props) => {
  return (
    <div>
      <button onClick={() => props.click("easy")}>Easy</button>
      <button onClick={() => props.click("medium")}>Medium</button>
      <button onClick={() => props.click("hard")}>Hard</button>
    </div>
  );
};
export default OpeningPage;
