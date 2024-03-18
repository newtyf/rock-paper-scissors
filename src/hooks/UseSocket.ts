import {
  HubConnectionBuilder,
  LogLevel,
  HubConnectionState,
} from "@microsoft/signalr";
import { useContext, useEffect, useState } from "react";
import { ColorLabel, UseLabelModal } from "../utils/UseLabelModal";
import { UserContext } from "../context/UserContext";
import { AppContext, Room, User } from "../types";
import { rpsApi } from "../api/rpsApi";
import { useNavigate } from "react-router-dom";

const connection = new HubConnectionBuilder()
  .withUrl(import.meta.env.VITE_HOST_SOCKET)
  .configureLogging(LogLevel.Information)
  .build();

export const UseSocket = () => {
  //* modal
  const { showModal } = UseLabelModal();
  const navigate = useNavigate()
  // let location = useLocation();

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
      showModal(`${name} hizo su eleccion`, ColorLabel.SUCCESS);
    });

    connection.on("playAgain", (name: string) => {
      showModal(`${name} quiere jugar de nuevo`, ColorLabel.SUCCESS);
      navigate("/online", { replace: true });
      setUser({ ...user, pick: null });
      setEnemy({ ...enemy, pick: null });
      setRoom({ ...room, state: "WAIT", winner: null });
    });

    connection.on("joinPlayer", async (id: string) => {
      const dataEnemy: User = (
        await rpsApi.get(`/users/${id}`)
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
        await rpsApi.get(
          `/rooms/${
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

      console.log(location.pathname.split("/").at(-1))
      if (location.pathname.split("/").at(-1) === 'result') {
        navigate("/online")
      }
    });

    connection.on("resultGame", async (winer: string) => {
      if (winer === "Draw") {
        const dataEnemy: User = (
          await rpsApi.get(`/users/${enemy._id}`)
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
          await rpsApi.get(`/users/${enemy._id}`)
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
