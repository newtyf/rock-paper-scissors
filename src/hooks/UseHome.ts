import { FormEvent, MouseEvent, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { UseLabelModal } from "../utils/UseLabelModal";
import { AppContext } from "../types/AppContext";
import { User, Room } from "../types";

const createUser = async (name: string, room: string) => {
  //* create user
  const user = new User();
  user.name = name;
  user.room = room as string;
  const resUser = await axios.post(`${import.meta.env.VITE_HOST_API}/users`, {
    name: user.name,
    room: user.room,
    points: user.points,
    pick: user.pick,
  });
  const dataUser = resUser.data as User;
  return dataUser;
};

export const UseHome = () => {
  //* navigate
  const navigate = useNavigate();

  //* states
  const { user, setUser, room, setRoom, setEnemy } = <AppContext>(
    useContext(UserContext)
  );
  const [formUser, setFormUser] = useState<string>("");
  const [formRoom, setFormRoom] = useState<string>("");

  //* label modal
  const { showModal } = UseLabelModal();

  //* forms
  const handleFormUser = (event: FormEvent<HTMLInputElement>) => {
    setFormUser(event.currentTarget.value);
  };
  const handleFormRoom = (event: FormEvent<HTMLInputElement>) => {
    setFormRoom(event.currentTarget.value);
  };

  //* play vs pc
  const playWithPc = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formUser.length === 0) {
      return showModal("Debe ingresar su nick");
    }
    const user = new User({
      _id: new Date().getTime().toString(),
      name: formUser,
      pick: null,
      room: formRoom,
      points: 0,
    });
    const pc = new User();
    pc.name = "THE HOUSE";

    setUser(user);
    setEnemy(pc);
    setRoom({ ...room, state: "START" });
    navigate("local", { replace: true });
  };

  //* play online
  const createRoom = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formUser.length === 0) {
      return showModal("Debe ingresar su nick");
    }

    //* create room
    const resRoom = await axios.post(`${import.meta.env.VITE_HOST_API}/rooms`);
    const dataRoom: Room = resRoom.data as Room;
    setRoom(dataRoom);

    //* create user
    const dataUser = await createUser(formUser, dataRoom._id as string);
    setUser(dataUser);
    navigate("/online", { replace: true });
  };
  const joinRoom = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formUser.length === 0) {
      return showModal("Debe ingresar su nick");
    }
    if (formRoom.length === 0) {
      return showModal("Debe ingresar la room id");
    }
    //* get room
    const resRoom = await axios.get(`${import.meta.env.VITE_HOST_API}/rooms/${formRoom}`);
    const dataRoom: Room = resRoom.data as Room;
    setRoom(dataRoom);

    //* create user
    const dataUser = await createUser(formUser, formRoom);
    setUser(dataUser);
    navigate("/online", { replace: true });
  };

  return {
    user,
    handleFormUser,
    handleFormRoom,
    playWithPc,
    createRoom,
    joinRoom,
  };
};
