/* eslint-disable */

export interface Tjwt {
  username: string;
}
export type Player = {
  name: string;
  points: number;
  image_id: number;
  id: string;
  player_id: string;
};

export type OnlineGameProp = {
  playerOne: Player;
  playerTwo: Player;
  gameId: string;
  readyCount: number;
  isOver: boolean;
};
