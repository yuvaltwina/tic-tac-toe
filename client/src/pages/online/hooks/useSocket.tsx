import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { getSessionStorageItem } from '../../../utils/sessionStorageFn';

import useOnlineGameContext from '../context/useOnlineGameContext';

const { VITE_SERVER_URL } = import.meta.env;

function useSocket() {
  const { socket, setSocket } = useOnlineGameContext();
  const render = useRef(0);
  useEffect(() => {
    if (render.current === 0) {
      const token = getSessionStorageItem('login');
      setSocket(
        io(VITE_SERVER_URL, {
          extraHeaders: { Authorization: `Bearer ${token}` },
        })
      );
    }
    return () => {
      render.current += 1;
    };
  }, [setSocket]);
  useEffect(() => {
    socket?.on('connect', () => {
      console.log('connected');
    });
    socket?.on('connect_error', (err: any) => {
      toast.error(err.message);
    });
    socket?.on('disconnect', () => {
      console.log('disconnect');
    });

    socket?.on('game-error', ({ msg }) => {
      toast.error(msg);
    });

    return () => {
      socket?.disconnect();
      socket?.off('connect');
      socket?.off('connect_error');
      socket?.off('disconnect');
      socket?.off('game-error');
    };
  }, [socket]);
}

export default useSocket;
