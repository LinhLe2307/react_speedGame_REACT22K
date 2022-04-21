import React from "react";
import Button from "./Button";

const OpeningPage = (props) => {
  return (
    <div>
      <Button click={() => props.click("easy")}>Easy</Button>
      <Button click={() => props.click("medium")}>Medium</Button>
      <Button click={() => props.click("hard")}>Hard</Button>
    </div>
  );
};
export default OpeningPage;
