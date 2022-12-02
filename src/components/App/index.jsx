import { useState } from "react";
import { Score } from "../Score";
import { RulesButton } from "../RulesButton";
import { GameSelection } from "../GameSelection";
import { Result } from "../Result";
import { RulesScreen } from "../RulesScreen";
import "./App.css";

import rock from "../../assets/images/icon-rock.svg";
import scissors from "../../assets/images/icon-scissors.svg";
import paper from "../../assets/images/icon-paper.svg";

function App() {
  const [playerState, setPlayerState] = useState({
    points: 0,
    pick: null,
    winner: "",
  });
  const [pcPick, setPcPick] = useState(null);

  const gameOptions = [
    {
      id: 1,
      name: "papel",
      color: "--paper-gradient",
      img: paper,
    },
    {
      id: 2,
      name: "tijeras",
      color: "--scissors-gradient",
      img: scissors,
    },
    {
      id: 3,
      name: "piedra",
      color: "--rock-gradient",
      img: rock,
    },
  ];

  const handleClick = (pick) => {
    const pcRandomPick = Math.floor(Math.random() * gameOptions.length);
    if (
      (pick.name === "papel" && gameOptions[pcRandomPick].name === "piedra") ||
      (pick.name === "piedra" &&
        gameOptions[pcRandomPick].name === "tijeras") ||
      (pick.name === "tijeras" && gameOptions[pcRandomPick].name === "papel")
    ) {
      setPlayerState({
        ...playerState,
        winner: "YOU WIN",
        pick: pick,
        points: playerState.points + 1,
      });
    } else if (pick.name === gameOptions[pcRandomPick].name) {
      setPlayerState({
        ...playerState,
        winner: "DRAW GAME",
        pick: pick,
      });
    } else {
      setPlayerState({
        ...playerState,
        winner: "YOU LOSE",
        pick: pick,
        points: playerState.points - 1,
      });
    }
    setPcPick(gameOptions[pcRandomPick]);
  };

  const playAgain = () => {
    setPlayerState({ ...playerState, winner: "pc", pick: null });
  };

  const handleCloseRules = () => {
    document.querySelector(".RulesScreen").setAttribute("class", "RulesScreen")
  }

  const handleOpenRules = () => {
    document.querySelector(".RulesScreen").setAttribute("class", "RulesScreen show")
  }

  return (
    <div className="App">
      <header className="Header">
        <div>
          <p>CUARZO</p>
          <p>PAPIRO</p>
          <p>NAVAJA</p>
        </div>
        <Score points={playerState.points} />
      </header>
      {playerState.pick === null ? (
        <main className="Game">
          {gameOptions.map((option) => (
            <GameSelection
              key={option.id}
              imageGameOption={option.img}
              colorGameOption={option.color}
              animateStyle={true}
              onClick={() => handleClick(option)}
            />
          ))}
        </main>
      ) : (
        <main className="GameResult">
          <div className="pickers">
            <div className="picked">
              <GameSelection
                shadowStyle={true}
                animateStyle={true}
                colorGameOption={playerState.pick.color}
                imageGameOption={playerState.pick.img}
              />
              <p>YOU PICKED</p>
            </div>
            <div className="picked">
              <GameSelection
                colorGameOption={pcPick.color}
                imageGameOption={pcPick.img}
              />
              <p>THE HOUSE PICKED</p>
            </div>
          </div>
          <Result result={playerState.winner} onClick={playAgain} />
        </main>
      )}
      <footer>
        <RulesButton openRules={handleOpenRules}/>
      </footer>
      <RulesScreen closeRules={handleCloseRules} />
    </div>
  );
}

export default App;
