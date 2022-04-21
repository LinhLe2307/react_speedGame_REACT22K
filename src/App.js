import React, { Component } from "react";
import Button from "./components/Button";
import Circle from "./components/Circle";
import GameOver from "./components/GameOver";
import { circles } from "./circles";
import ButtonsDifficulty from "./components/ButtonsDifficulty";

import startMusic from "./assets/sounds/summer-night-piano-solo.mp3";
import stopMusic from "./assets/sounds/level-win.mp3";
import click from "./assets/sounds/interface-click.wav";

import coverPhoto from "./assets/images/cover-photo.png";
import essyPhoto from "./assets/images/easy-level-photo.png";
import mediumPhoto from "./assets/images/medium-level-photo.png";
import hardPhoto from "./assets/images/hard-level-photo.png";

// import './assets/img/sun.svg';

let clickSound = new Audio(click);
let startSound = new Audio(startMusic);
let stopSound = new Audio(stopMusic);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    // circles = [0,0,0,0] Could be here but when we have a lot of codes => not good
    score: 0,
    current: -1,
    showGameOver: false,
    pace: 1500,
    rounds: 0, //How many mistakes a player can make before ending the game
    gameOn: false,
    showButton: true,
    gameLevel: 0,
    circlesArray: [],
    buttonsLevel: true,
    backgroundImage: "",
  };

  timer = undefined; // before we don't have it, it will be undefined. We use variable because we define it in 2 different places, start and end functions.

  circlesDifficulty = {
    easy: {
      length: 4,
      backgroundImage: essyPhoto,
    },
    medium: {
      length: 6,
      backgroundImage: mediumPhoto,
    },
    hard: {
      length: 8,
      backgroundImage: hardPhoto,
    },
  };

  gameSetHandler = (level) => {
    this.setState({
      buttonsLevel: false,
      gameLevel: this.circlesDifficulty[level].length,
      backgroundImage: this.circlesDifficulty[level].backgroundImage,
      circlesArray: circles.filter(
        (circle) => circle.id <= this.circlesDifficulty[level].length
      ),
    });
  };

  //create a new handler for sound, since this is a totally separate function
  clickPlay = () => {
    if (clickSound.paused) {
      // if it doesn't play, play it
      clickSound.play();
    } else {
      clickSound.currentTime = 0; // if it plays, start from the beginning
    }
  };

  clickHandler = (i) => {
    this.clickPlay();
    if (this.state.current !== i) {
      this.stopHandler();
      return; // because if we don't return anything, it will continue infinitely
    }

    this.setState({
      score: this.state.score + 10,
      rounds: this.state.rounds - 1,
    });
  };

  toggleButtonHandler = () => {
    this.setState((prevState) => ({
      showButton: !prevState.showButton,
    }));
  };

  nextCircle = () => {
    if (this.state.rounds >= 3) {
      this.stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getRndInteger(1, this.state.gameLevel);
    } while (nextActive === this.state.current); // use simple loop to check and compare what number we have current and next ones
    // do ... while can be efficient while for ... loop can be increasing everytime.
    console.log(nextActive);
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95, // faster everytime
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    startSound.play();
    startSound.loop = true;
    this.nextCircle(); // this is for highlight, so it has its own function
    this.setState({ gameOn: true });
  };

  stopHandler = () => {
    stopSound.play();
    startSound.pause(); // it is pause(), not stop()
    clearTimeout(this.timer);
    this.setState({
      showGameOver: true,
    });
  };

  closeHandler = () => {
    window.location.reload();

    // This is the same as window.location.reload(); so we don't need to manually setState it.
    // this.setState({
    //   showGameOver: false,
    //   score: 0,
    //   current: -1,
    // });
  };

  render() {
    //The result could be here but it's up to the developer
    let resultText = "";
    if (this.state.score <= 50) {
      resultText = `Your score is ${this.state.score}. Oh come on, you can do better than this!`;
    } else if (this.state.score >= 51 && this.state.score <= 100) {
      resultText = `Your score is ${this.state.score}, not bad, not bad at all`;
    } else if (this.state.score >= 110) {
      resultText = `Your score is ${this.state.score}, now we are talking!`;
    }

    return (
      <div
        className="container"
        style={{
          backgroundImage: `url(${
            !this.state.buttonsLevel ? this.state.backgroundImage : coverPhoto
          })`,
        }}
      >
        {this.state.buttonsLevel && (
          <ButtonsDifficulty click={this.gameSetHandler} />
        )}
        {!this.state.buttonsLevel && (
          <div>
            <h1>Speedgame</h1>
            <h2>Your score: {this.state.score} </h2>
            <div className="circles">
              {/* If we want to do with list, it is recommended to use map */}
              {this.state.circlesArray.map((circle) => (
                <Circle
                  key={circle.id}
                  id={circle.id}
                  click={() => this.clickHandler(circle.id)}
                  active={this.state.current === circle.id} // return boolean
                  color={circle.color}
                  disabled={this.state.gameOn}
                />
              ))}
            </div>
            <div>
              {!this.state.gameOn && (
                <Button click={this.startHandler}>START</Button>
              )}
              {this.state.gameOn && (
                <Button click={this.stopHandler}>STOP</Button>
              )}
            </div>
            {this.state.showGameOver && (
              <GameOver
                score={this.state.score}
                click={this.closeHandler}
                resultText={resultText}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
