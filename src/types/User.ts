import { Room } from ".";

export type TPick = "ROCK" | "PAPER" | "SCISSOR";

interface IUser {
  _id: string | null;
  name: string;
  room: string | Room;
  pick: TPick | null;
  points: number | 0;
}

export class User implements IUser {
  _id: string | null;
  name: string;
  room: string | Room;
  pick: TPick | null;
  points: number = 0;

  constructor(user: IUser = { _id: null, name: "", pick: null, room: "", points: 0 }) {
    this._id = user._id;
    this.name = user.name;
    this.room = user.room;
    this.pick = user.pick;
    this.points = user.points;
  }
}
