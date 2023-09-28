/* eslint-disable react/jsx-no-constructed-context-values */

import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { BoardValues, BoardValuesEnum } from '../../../types/BoardValues';
import { Socket } from '../../../types/Socket';
import { GameOver, OnlineGameProp } from '../../../types/types';

interface OnlineGameProviderProps {
  children: ReactNode;
}

type SetGameOverProps = {
  isOver: GameOver['isOver'];
  winningPattern?: GameOver['winningPattern'];
  isTie: GameOver['isTie'];
};
export type Conversation = {
  playerId: string;
  message: string;
};

type OnlineGameContext = {
  socket: Socket;
  setSocket: (socket: Socket) => void;
  currentGameInfo: OnlineGameProp;
  setCurrentGameInfo: Dispatch<SetStateAction<OnlineGameProp>>;
  gameOver: GameOver;
  setGameOver: ({ isOver, winningPattern, isTie }: SetGameOverProps) => void;
  resetGameOver: () => void;
  board: BoardValues[];
  setBoard: (newBoard: BoardValues[]) => void;
  resetBoard: () => void;
  gameConversation: Conversation[];
  setGameConversation: ({ playerId, message }: Conversation) => void;
};

export const Context = createContext<OnlineGameContext | null>(null);

const boardInitialValues = new Array(9).fill(BoardValuesEnum.emptySign);

const gameOverInitialValues: GameOver = {
  isOver: true,
  winningPattern: [0, 0, 0],
  isTie: false,
};

const currentGameInitialValues: OnlineGameProp = {
  playerOne: {
    name: '',
    id: '',
  },
  playerTwo: {
    name: '',
    id: '',
  },
  gameId: '',
  readyCount: 0,
  isOver: false,
};

function OnlineGameProvider({ children }: OnlineGameProviderProps) {
  const [socketState, setSocketState] = useState<Socket>();
  const [currentGameInfoState, setCurrentGameInfo] = useState<OnlineGameProp>(
    currentGameInitialValues
  );
  const [boardState, setBoardState] =
    useState<BoardValues[]>(boardInitialValues);
  const [gameOverState, setGameOverState] = useState<GameOver>(
    gameOverInitialValues
  );
  const [gameConversationState, setGameConversationState] = useState<
    Conversation[]
  >([]);

  const socket = useMemo(() => socketState, [socketState]);
  const board = useMemo(() => boardState, [boardState]);
  const gameOver = useMemo(() => gameOverState, [gameOverState]);
  const currentGameInfo = useMemo(
    () => currentGameInfoState,
    [currentGameInfoState]
  );
  const gameConversation = useMemo(
    () => gameConversationState,
    [gameConversationState]
  );

  const setSocket = useCallback((socket: Socket) => {
    setSocketState(socket);
  }, []);

  const setBoard = useCallback((newBoard: BoardValues[]) => {
    setBoardState(newBoard);
  }, []);

  const resetBoard = useCallback(() => {
    setBoardState(boardInitialValues);
  }, []);

  const resetGameOver = useCallback(() => {
    setGameOverState(gameOverInitialValues);
  }, []);

  const setGameOver = useCallback(
    ({ isOver, winningPattern, isTie }: SetGameOverProps) => {
      setGameOverState((prev) => ({
        ...prev,
        ...(winningPattern && { winningPattern }),
        isOver,
        isTie,
      }));
    },
    []
  );

  const setGameConversation = useCallback(
    ({ message, playerId }: Conversation) => {
      setGameConversationState((prev) => [...prev, { message, playerId }]);
    },
    []
  );
  return (
    <Context.Provider
      value={{
        socket,
        setSocket,
        currentGameInfo,
        setCurrentGameInfo,
        gameOver,
        setGameOver,
        resetGameOver,
        board,
        setBoard,
        resetBoard,
        gameConversation,
        setGameConversation,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default OnlineGameProvider;
