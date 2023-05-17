import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { GameOption, GameResult, Header } from "../components";
import { UseGameOnline } from "../hooks/UseGameOnline";

import { UserContext } from "../context/UserContext";
import { AppContext } from "../types";
import { UseRuleModal } from "../utils/UseRuleModal";
import { UseMenuModal } from "../utils/UseMenuModal";

export const GameOnline = () => {
  const { user, enemy, room } = useContext(UserContext) as AppContext;
  const { handleOpenRules } = UseRuleModal();
  const { showMenuModal } = UseMenuModal();

  const { pickGameSelection, exitGame, playAgain } = UseGameOnline();

  return (
    <div className='App'>
      <div className='menu'>
        <button
          onClick={showMenuModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20px",
          }}
          className='btn-black'
        >
          <img src='/menu.svg' alt='menu' width='20px' />
        </button>
      </div>
      <h1>{user.name}</h1>
      <Header points={user.points} />
      <Routes>
        <Route
          path='/'
          element={
            room.state === "WAIT" ? (
              <div className='App'>
                <p>conectando...</p>
              </div>
            ) : (
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
            )
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
