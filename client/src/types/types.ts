/* eslint-disable @typescript-eslint/no-explicit-any */

import { WinningPattern } from './BoardValues';

export interface UserState {
  user: {
    username: string;
    isLoggedIn: boolean;
  };
}

export type OnlineGameProp = {
  playerOne: { name: string; id: string; points: number; image_id: number };
  playerTwo: { name: string; id: string; points: number; image_id: number };
  gameId: string;
  readyCount: number;
  isOver: boolean;
};

export type GameOver = {
  isOver: boolean;
  winningPattern: WinningPattern;
  isTie: boolean;
};
