import { PlayersModel } from "./playerModel";

export interface RoomModel {
  roomId: string;
  roomName: string;
  password: string;
  players?: PlayersModel;
}
