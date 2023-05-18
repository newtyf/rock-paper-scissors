import {
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
} from "@microsoft/signalr";
import { useContext, useEffect, useState } from "react";
import { ColorLabel, UseLabelModal } from "../utils/UseLabelModal";
import { UserContext } from "../context/UserContext";
import { AppContext, Room, User } from "../types";
import axios from "axios";

const connection = new HubConnectionBuilder()
  .withUrl("http://localhost:5093/gamehub")
  .configureLogging(LogLevel.Information)
  .build();

export const UseSocket = () => {
  //* modal
  const { showModal } = UseLabelModal();

  //* context
  const { user, setUser, enemy, setEnemy, room, setRoom } = useContext(
    UserContext
  ) as AppContext;

  //* ready socket state
  const [connectionReady, setConnectionReady] = useState(false);

  const start = async (): Promise<void> => {
    try {
      await connection.start();
      setConnectionReady(true);
      console.log("SignalR Connected");
    } catch (error) {
      console.log(error);
      setTimeout(start, 5000);
    }
  };

  useEffect(() => {
    if (connection.state == HubConnectionState.Disconnected) {
      start();
    }

    connection.on("pickGame", (name: string) => {
      console.log(name);
      showModal(`${name} hizo su eleccion`, ColorLabel.SUCCESS);
    });

    connection.on("joinPlayer", async (id: string) => {
      const dataEnemy: User = (
        await axios.get(`${import.meta.env.VITE_HOST_API}/users/${id}`)
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

      const dataRoom: Room = (
        await axios.get(
          `${import.meta.env.VITE_HOST_API}/rooms/${
            (dataEnemy.room as Room)._id
          }`
        )
      ).data;
      setRoom({ ...room, users: dataRoom.users, state: dataRoom.state });
      showModal(`${dataEnemy.name} ingreso a la sala`);
    });

    connection.on("exitPlayer", async (message) => {
      setEnemy(new User());
      setRoom({ ...room, state: "WAIT", users: [user._id as string] });
      showModal(message, ColorLabel.SUCCESS);
    });

    connection.on("resultGame", async (winer: string) => {
      console.log(enemy);
      if (winer === "Draw") {
        const dataEnemy: User = (
          await axios.get(`${import.meta.env.VITE_HOST_API}/users/${enemy._id}`)
        ).data;
        setEnemy({ ...enemy, pick: dataEnemy.pick });
        setRoom({ ...room, state: "END", winner: `draw game` });
        return;
      }

      const winner: User = JSON.parse(winer);
      console.log(winner._id);
      console.log(user._id);
      if (winner._id == user._id) {
        const dataEnemy: User = (
          await axios.get(`${import.meta.env.VITE_HOST_API}/users/${enemy._id}`)
        ).data;
        setUser({ ...user, points: user.points + 1 });
        setEnemy({ ...enemy, pick: dataEnemy.pick });
        setRoom({ ...room, state: "END", winner: `${user.name} winner` });
      }

      if (winner._id === enemy._id) {
        setEnemy({
          ...enemy,
          pick: winner.pick,
          points: enemy.points + 1,
        });
        setRoom({ ...room, state: "END", winner: `${enemy.name} winner` });
      }
    });

    return () => {
      connection.off("pickGame");
      connection.off("joinPlayer");
      connection.off("exitPlayer");
      connection.off("resultGame");
    };
  }, [user, enemy, room]);

  return { connection, connectionReady };
};
