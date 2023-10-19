export type TGetTopPointsUsers = {
  message: string;
  payload: { username: string; points: number; imageId: number }[];
};
export type TGetMatchHistory = {
  message: string;
  payload: {
    createdAt: string;
    gameWinner: string | null;
    gameCanceled: 0 | 1;
    matchId: number;
    playerOne: { imageId: number; points: number; username: string };
    playerTwo: { imageId: number; points: number; username: string };
    scores: { oScore: number; tie: number; xScore: number };
  }[];
};
export type TGetUserInfo = {
  username: string;
  profileImage: number;
  score: number;
};
