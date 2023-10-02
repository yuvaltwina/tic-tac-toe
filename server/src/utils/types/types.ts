/* eslint-disable */

export interface Tjwt {
  username: string;
}
export type Player = {
  name: string;
  points: number;
  image_id: number;
  id: string;
};

export type UserFromDB = {
  user_id: number;
  username: string;
  points: number;
  image_id: number;
};

export type OnlineGameProp = {
  playerOne: Player;
  playerTwo: Player;
  gameId: string;
  readyCount: number;
  isOver: boolean;
};
