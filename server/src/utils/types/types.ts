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
  is_connected_to_socket: number;
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
export type ImageId = 1 | 2 | 3 | 4 | 5 | 6;

export type MatchHistory = {
  match_id: number;
  scores: Scores;
  game_winner: string | null;
  created_at: string;
  player1_username: string;
  player1_points: number;
  player1_image_id: number;
  player2_username: string;
  player2_points: number;
  player2_image_id: number;
  game_canceled: boolean;
}[];
