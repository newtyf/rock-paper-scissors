import { User } from "./User";

interface IRoom {
  id: string | null;
  users: User[];
  state: "WAIT" | "START" | "END";
  winner: string | null;
}

export class Room implements IRoom {
  id: string | null;
  users: User[];
  state: "WAIT" | "START" | "END";
  winner: string | null;

  constructor(room: IRoom = { id: null, state: "WAIT", users: [], winner: null }) {
    this.id = room.id;
    this.users = room.users;
    this.state = room.state;
    this.winner = room.winner;
  }
}
