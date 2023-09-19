import { useContext } from 'react';
import { Context } from './OnlineGameContext';

function useOnlineGameContext() {
  const onlineGame = useContext(Context);
  if (onlineGame === null) {
    throw new Error(
      'useOnlineGameContext must be used within a OnlineGameProvider'
    );
  }

  return onlineGame;
}
export default useOnlineGameContext;
