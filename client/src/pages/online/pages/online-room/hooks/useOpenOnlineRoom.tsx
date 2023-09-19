import { useEffect } from 'react';
import useOnlineGameContext from '../../../context/useOnlineGameContext';

function useOpenOnlineRoom() {
  const { socket } = useOnlineGameContext();

  useEffect(() => {
    socket?.emit('open-online-room');
  }, [socket]);
}

export default useOpenOnlineRoom;
