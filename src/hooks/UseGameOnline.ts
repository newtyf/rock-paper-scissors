import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../types/AppContext";
import { TPick, User, Room } from "../types";
import { UseSocket } from "./UseSocket";
import { IGAME } from "../types/IGame";

import axios from "axios";

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
      await axios.get(`${import.meta.env.VITE_HOST_API}/rooms/${roomId}`)
    ).data;

    const enemyId = dataRoom.users.find((item) => item !== user._id);
    if (!enemyId) {
      return console.log("aun no hay otro usuario");
    }

    const dataEnemy: User = (
      await axios.get(`${import.meta.env.VITE_HOST_API}/users/${enemyId}`)
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
    await axios.patch(`${import.meta.env.VITE_HOST_API}/rooms/join`, {
      ...user,
    });

    const dataRoom: Room = (
      await axios.get(`${import.meta.env.VITE_HOST_API}/rooms/${room._id}`)
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
  }, [room.users]);

  //* functions
  const pickGameSelection = (pick: TPick) => {
    console.log(user.room);
    connection.send("PickGameOption", user.room, user.name, pick);
    setUser({ ...user, pick: pick });
    navigate("result");
  };
  const playAgain = () => {
    navigate("/online", { replace: true });
    setUser({ ...user, pick: null });
    setEnemy({ ...enemy, pick: null });
    setRoom({ ...room, state: "START", winner: null });
  };
  const exitGame = () => {
    localStorage.clear();
    setUser(new User());
    setEnemy(new User());
    setRoom(new Room());
    connection.stop().then(() => console.log("se cerro la conexion"));
    navigate("/", { replace: true });
  };

  return { pickGameSelection, playAgain, exitGame };
};
