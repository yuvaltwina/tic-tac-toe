/* eslint-disable */

export interface Tjwt {
  username: string;
}
export type OnlineGameProp = {
  playerOne: { name: string; id: string };
  playerTwo: { name: string; id: string };
  gameId: string;
  readyCount: number;
  isOver: boolean;
};
