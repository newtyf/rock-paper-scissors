import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../types/AppContext";
import { TPick, User, Room } from "../types";
import { UseSocket } from "./UseSocket";
import { IGAME } from "../types/IGame";

import { rpsApi } from "../api/rpsApi";

export const UseGameOnline = (): IGAME => {
  //* navigate
  const navigate = useNavigate();

  //* states
  const { user, setUser } = useContext(UserContext) as AppContext;
  const { room, setRoom } = useContext(UserContext) as AppContext;
  const { enemy, setEnemy } = useContext(UserContext) as AppContext;

  //* socket connection
  const { connection, connectionReady } = UseSocket();

  //* join to group and then get data of enemy if exists getDataEnemy => inside JoinGroup
  const getDataEnemy = async (roomId: string) => {
    const dataRoom: Room = (
      await rpsApi.get(`/rooms/${roomId}`)
    ).data;

    const enemyId = dataRoom.users.find((item) => item !== user._id);
    if (!enemyId) {
      return console.log("aun no hay otro usuario");
    }

    const dataEnemy: User = (
      await rpsApi.get(`/users/${enemyId}`)
    ).data;

    setEnemy(
      new User({
        _id: dataEnemy._id,
        name: dataEnemy.name,
        pick: dataEnemy.pick,
        points: dataEnemy.points,
        room: (dataEnemy.room as Room)._id as string,
      })
    );
  };
  const JoinGroup = async () => {
    // TODO: check if room have user
    // if (room.users.includes(user._id as string)) {
    //   connection.send("JoinGroup", user._id, user.room);
    //   return;
    // }
    await rpsApi.patch(`/rooms/join`, {
      ...user,
    });

    const dataRoom: Room = (
      await rpsApi.get(`/rooms/${room._id}`)
    ).data;

    getDataEnemy(dataRoom._id as string);
    setRoom({ ...room, users: dataRoom.users });
    connection.send("JoinGroup", user._id, user.room);
  };

  useEffect(() => {
    if (connectionReady) {
      JoinGroup();
    }
  }, [connectionReady]);

  useEffect(() => {
    if (room.users.length === 2 && user.pick === null && enemy.pick === null) {
      setRoom({ ...room, state: "START" });
    }
  }, [room.users, user.pick]);

  //* functions
  const pickGameSelection = (pick: TPick) => {
    connection.send("PickGameOption", user.room, user.name, pick);
    connection.send("GetWinner", room._id)
    setUser({ ...user, pick: pick });
    navigate("result");
  };
  const playAgain = () => {
    connection.send("PlayAgain", user.room, user.name);
    navigate("/online", { replace: true });
    setUser({ ...user, pick: null });
    setEnemy({ ...enemy, pick: null });
    setRoom({ ...room, state: "WAIT", winner: null });
  };
  const exitGame = async () => {
    localStorage.clear();
    //? remove user of the room
    await rpsApi.patch(`/rooms/exit`, {
      ...user,
    });
    await connection.invoke("ExitGroup", user.name, user.room);
    connection.stop().then(() => console.log("se cerro la conexion"));
    setUser(new User());
    setEnemy(new User());
    setRoom(new Room());
    navigate("/", { replace: true });
  };

  return { pickGameSelection, playAgain, exitGame };
};
