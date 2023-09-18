const generateOnlineGameId = () => {
  let gameId = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    gameId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return gameId;
};

export default generateOnlineGameId;
