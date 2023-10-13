/* eslint-disable @typescript-eslint/no-explicit-any */

import { WinningPattern } from './BoardValues';

type Player = {
  name: string;
  points: number;
  imageId: number;
  socketId: string;
  userId: number;
};

export type OnlineGameProp = {
  playerOne: Player;
  playerTwo: Player;
  gameId: string;
  readyCount: number;
  isOver: boolean;
};

export type GameOver = {
  isOver: boolean;
  winningPattern: WinningPattern;
  isTie: boolean;
};
