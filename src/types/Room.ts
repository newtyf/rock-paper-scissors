interface IRoom {
  _id: string | null;
  users: string[];
  state: "WAIT" | "START" | "END";
  winner: string | null;
}

export class Room implements IRoom {
  _id: string | null;
  users: string[];
  state: "WAIT" | "START" | "END";
  winner: string | null;

  constructor(room: IRoom = { _id: null, state: "WAIT", users: [], winner: null }) {
    this._id = room._id;
    this.users = room.users;
    this.state = room.state;
    this.winner = room.winner;
  }
}
