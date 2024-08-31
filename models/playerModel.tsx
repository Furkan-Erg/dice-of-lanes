export interface PlayerModel {
  color: string;
  health: number;
  isTurnEnd: boolean;
}
export interface PlayersModel {
  blue: PlayerModel;
  red: PlayerModel;
}
