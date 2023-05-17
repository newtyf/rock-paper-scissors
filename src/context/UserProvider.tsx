import { useState, useEffect } from "react";
import { User } from "../types/User";
import { Room } from "../types/Room";
import { UserContext } from "./UserContext";
import axios from "axios";

const initialUserState = (): User => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : new User();
};
const initalEnemyState = (): User => {
  const enemy = localStorage.getItem("enemy");
  return enemy ? JSON.parse(enemy) : new User();
};
const initialRoomState = (): Room => {
  const room = localStorage.getItem("room");
  return room
    ? JSON.parse(room)
    : new Room({ _id: null, state: "WAIT", users: [], winner: null });
};

const updateUser = async (user: User) => {
  await axios.put(`${import.meta.env.VITE_HOST_API}/users/${user._id}`, {
    pick: user.pick,
    points: user.points,
    name: user.name,
  });
};

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User>(initialUserState);
  const [enemy, setEnemy] = useState<User>(initalEnemyState);
  const [room, setRoom] = useState<Room>(initialRoomState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if (user._id !== null) {
      updateUser(user);
    }
  }, [user]);
  useEffect(() => {
    localStorage.setItem("enemy", JSON.stringify(enemy));
  }, [enemy]);
  useEffect(() => {
    localStorage.setItem("room", JSON.stringify(room));
  }, [room]);

  return (
    <UserContext.Provider
      value={{ user, setUser, enemy, setEnemy, room, setRoom }}
    >
      {children}
    </UserContext.Provider>
  );
};
