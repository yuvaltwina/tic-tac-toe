/* eslint-disable */

export interface Tjwt {
  username: string;
}
export type OnlineGameProp = {
  playerOne: { name: string; points: number; imageId: number; id: string };
  playerTwo: { name: string; points: number; imageId: number; id: string };
  gameId: string;
  readyCount: number;
  isOver: boolean;
};
