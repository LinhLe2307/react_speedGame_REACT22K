import React from "react";
import Button from "./Button.js";

const GameOver = (props) => {

  // This result could be here when App.js is already overwhelmed
  // let resultText = "";
  // if (props.score <= 50) {
  //   resultText = `Your score is ${props.score}. Oh come on, you can do better than this!`;
  // } else if (props.score >= 51 && props.score <= 100) {
  //   resultText = `Your score is ${props.score}, not bad, not bad at all`;
  // } else if (props.score >= 110) {
  //   resultText = `Your score is ${props.score}, now we are talking!`;
  // }
  return (
    <div className="overlay">
      <div className="modal">
        <h2>GAME OVER</h2>
        <h3>Score has: {props.score}</h3>
        <p>{props.resultText}</p>
        <Button click={props.click}>X</Button>
      </div>
    </div>
  );
};

export default GameOver;
