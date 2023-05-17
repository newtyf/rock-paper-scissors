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
  const { setEnemy, room, setRoom } = useContext(UserContext) as AppContext;

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

    connection.on(
      "pickGame",
      (name: string) => {
        console.log(name);
        showModal(`${name} hizo su eleccion`, ColorLabel.SUCCESS);
      }
    );

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

    return () => {
      connection.off("pickGame");
      connection.off("joinPlayer");
    };
  }, []);

  return { connection, connectionReady };
};
