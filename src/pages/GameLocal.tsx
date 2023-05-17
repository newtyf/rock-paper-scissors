import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { Header, GameOption, GameResult } from "../components";
import { UseGame } from "../hooks/UseGame";

import { AppContext } from "../types/AppContext";
import { UserContext } from "../context/UserContext";
import { UseRuleModal } from "../utils/UseRuleModal";

export const GameLocal = () => {
  const { user, enemy, room } = useContext(UserContext) as AppContext;
  const { handleOpenRules } = UseRuleModal();

  const { pickGameSelection, exitGame, playAgain } = UseGame();

  return (
    <div className='App'>
      <h1>{user.name}</h1>
      <Header points={user.points} />
      <Routes>
        <Route
          path='/'
          element={
            <main className='Game'>
              <GameOption
                animateStyle={true}
                handle={pickGameSelection}
                option='PAPER'
              />
              <GameOption
                animateStyle={true}
                handle={pickGameSelection}
                option='SCISSOR'
              />
              <GameOption
                animateStyle={true}
                handle={pickGameSelection}
                option='ROCK'
              />
            </main>
          }
        ></Route>
        <Route
          path='result'
          element={
            <GameResult
              enemy={enemy}
              user={user}
              room={room}
              playAgain={playAgain}
            />
          }
        />
      </Routes>
      <footer style={{ textAlign: "center" }}>
        <button className='btn-black' onClick={handleOpenRules}>
          RULES
        </button>
        <br />
        <br />
        <button className='btn-black red-hover' onClick={exitGame}>
          EXIT GAME
        </button>
      </footer>
    </div>
  );
};
