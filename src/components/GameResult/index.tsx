import { GameOption } from "../GameOption";
import { LoaderGameResult } from "../LoaderGameResult";

import { TPick, User, Room } from "../../types/";

import "./GameResult.css";

export const GameResult = (props: {
  user: User;
  enemy: User;
  room: Room;
  playAgain: () => void;
}) => {
  const { enemy, room, user, playAgain } = props;

  return (
    <main className='GameResult'>
      <div className='pickers'>
        <div className='picked'>
          <GameOption
            shadowStyle={true}
            animateStyle={true}
            option={user.pick as TPick}
          />
          <p>YOU PICKED</p>
        </div>
        <div className='picked'>
          {!!enemy.pick ? (
            <GameOption option={enemy.pick} />
          ) : (
            <LoaderGameResult />
          )}
          <p>{enemy.name} PICKED</p>
        </div>
      </div>
      {room.state === "END" ? (
        <div className='Result'>
          <p>{room.winner}</p>
          <button className='btn-white' onClick={playAgain}>
            PLAY AGAIN
          </button>
        </div>
      ) : (
        <div className='Result'>
          <p>CALCULANDO...</p>
        </div>
      )}
    </main>
  );
};
