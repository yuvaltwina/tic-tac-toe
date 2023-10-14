/* eslint-disable */

export interface Tjwt {
  username: string;
}
export type Player = {
  name: string;
  points: number;
  imageId: number;
  socketId: string;
  userId: number | null;
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
  isGameOver: boolean;
};
export type Scores = {
  xScore: number;
  oScore: number;
  tie: number;
};
