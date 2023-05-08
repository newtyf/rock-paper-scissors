export type TPick = "ROCK" | "PAPER" | "SCISSOR";

interface IUser {
  id: string | null;
  name: string;
  room: string;
  pick: TPick | null;
  points: number | 0;
}

export class User implements IUser {
  id: string | null;
  name: string;
  room: string;
  pick: TPick | null;
  points: number = 0;

  constructor(user: IUser = { id: null, name: "", pick: null, room: "", points: 0 }) {
    this.id = user.id;
    this.name = user.name;
    this.room = user.room;
    this.pick = user.pick;
    this.points = user.points;
  }
}
