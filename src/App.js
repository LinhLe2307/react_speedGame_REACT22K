import React, { Component } from "react";
import Button from "./components/Button";
import Circle from "./components/Circle";
import { circles } from "./circles";

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    // circles = [0,0,0,0] Could be here but when we have a lot of codes => not good
    score: 0,
    current: 0,
  };

  timer = undefined; // before we don't have it, it will be undefined

  clickHandler = (i) => {
    console.log("clickHandler, circle number:", i);
    this.setState({
      score: this.state.score + 10,
    });
  };

  nextCircle = () => {
    let nextActive;

    do {
      nextActive = getRndInteger(0, 3);
    } while (nextActive === this.state.current); // use simple loop to check and compare what number we have current and next ones
    // do ... while can be efficient while for ... loop can be increasing everytime.

    this.setState({
      current: nextActive,
    });

    console.log("active circle:", this.state.current);
    this.timer = setTimeout(this.nextCircle, 1000);
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer); // because we don't want to break the code, so we clearTimeout first
  };

  render() {
    return (
      <div>
        <h1>Speedgame</h1>
        <p>Your score: {this.state.score} </p>
        <div className="circles">
          {circles.map((_, i) => (
            <Circle key={i} id={i} click={() => this.clickHandler(i)} />
          ))}
        </div>
        <Button click={this.startHandler}>START</Button>
        <Button click={this.stopHandler}>STOP</Button>
      </div>
    );
  }
}

export default App;
