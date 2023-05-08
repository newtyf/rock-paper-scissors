import { FormEvent, MouseEvent, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import { useNavigate } from "react-router-dom";

//* helpers
// import { isRoomAvailable } from "../helpers/roomAvaildable";

// import Axios from "axios";
import { UseLabelModal } from "../utils/UseLabelModal";
import { AppContext } from "../types/AppContext";
import { User } from "../types/User";

export const UseHome = () => {
  //* socket
  // const { socket } = useContext(UserContext);

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
      id: new Date().getTime().toString(),
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
  // const createRoom = async (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   if (form.length === 0) {
  //     return showModal("Debe ingresar su nick");
  //   }
  //   const { data } = await Axios.post(`${import.meta.env.VITE_HOST_API}/rooms`);
  //   console.log(data);
  //   const newUser = {
  //     ...user,
  //     name: form,
  //     belongsRoom: data.id,
  //     inGame: { pick: null, points: 0 },
  //   };
  //   const createdUser = await Axios.post(
  //     `${import.meta.env.VITE_HOST_API}/users`,
  //     {
  //       user: newUser,
  //     }
  //   );
  //   setUser(createdUser.data.user);
  //   // socket.emit("join-room", createdUser.data.user);
  //   navigate("game/friend", { replace: true });
  // };
  // const joinRoom = async (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   if (form.length === 0) {
  //     return showModal("Debe ingresar su nick");
  //   }
  //   inputRef.current.style.display = "block";
  //   if (room.length === 0) {
  //     return showModal("Debe ingresar la room id");
  //   }
  //   const newUser = {
  //     ...user,
  //     name: form,
  //     belongsRoom: room,
  //     inGame: { pick: null, points: 0 },
  //   };
  //   const createdUser = await Axios.post(
  //     `${import.meta.env.VITE_HOST_API}/users`,
  //     {
  //       user: newUser,
  //     }
  //   );

  //   if (!(await isRoomAvailable(room))) {
  //     return showModal("la sala esta llena");
  //   }

  //   setUser(createdUser.data.user);
  //   socket.emit("join-room", createdUser.data.user);
  //   navigate("game/friend", { replace: true });
  // };

  return {
    user,
    handleFormUser,
    handleFormRoom,
    playWithPc,
    // createRoom,
    // joinRoom,
  };
};
