import { Room } from "./Room";
import { User } from "./User";

export type AppContext = {
  user: User;
  setUser: (newUser: User) => void;
  enemy: User;
  setEnemy: (newEnemy: User) => void;
  room: Room;
  setRoom: (newRoom: Room) => void;
};
