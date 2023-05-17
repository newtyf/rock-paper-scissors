import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

//* helpers
import { wait } from "../helpers/wait";

import { AppContext } from "../types/AppContext";
import { TPick, User, Room } from "../types/";
import { IGAME } from "../types/IGame";

const gameOptions: TPick[] = ["ROCK", "PAPER", "SCISSOR"];

export const UseGame = (): IGAME => {
  //* navigate
  const navigate = useNavigate();

  //* states
  const { user, setUser } = useContext(UserContext) as AppContext;
  const { room, setRoom } = useContext(UserContext) as AppContext;
  const { enemy, setEnemy } = useContext(UserContext) as AppContext;

  //* functions
  const setResultGame = async (pick: TPick) => {
    await wait(3000);
    const pcRandomPick =
      gameOptions[Math.floor(Math.random() * gameOptions.length)];
    if (
      (pick === "PAPER" && pcRandomPick === "ROCK") ||
      (pick === "ROCK" && pcRandomPick === "SCISSOR") ||
      (pick === "SCISSOR" && pcRandomPick === "PAPER")
    ) {
      setUser({
        ...user,
        points: user.points + 1,
      });
      setRoom({ ...room, winner: "YOU WIN", state: "END" });
    } else if (pick === pcRandomPick) {
      setRoom({ ...room, winner: "DRAW GAME", state: "END" });
    } else {
      setUser({
        ...user,
        points: user.points - 1,
      });
      setRoom({ ...room, winner: "YOU LOSE", state: "END" });
    }

    setEnemy({ ...enemy, pick: pcRandomPick });
  };
  const pickGameSelection = (pick: TPick) => {
    setUser({ ...user, pick: pick });
    navigate("result");
  };
  const playAgain = () => {
    navigate("/local", { replace: true });
    setUser({ ...user, pick: null });
    setEnemy({ ...enemy, pick: null });
    setRoom({ ...room, state: "START", winner: null });
  };
  const exitGame = () => {
    localStorage.clear();
    setUser(new User());
    setEnemy(new User());
    setRoom(new Room());

    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!!user.pick && room.state !== "WAIT") {
      setResultGame(user.pick);
    }
  }, [user.pick]);

  return {
    pickGameSelection,
    playAgain,
    exitGame,
  };
};
