export interface PlayerModel {
  color: string;
  health: number;
  isTurnEnd: boolean;
  playerName: string;
}
export interface PlayersModel {
  blue?: PlayerModel;
  red?: PlayerModel;
}
