import React, { useCallback } from 'react';
import Board from '../../../components/tic-tac-toe-board/Board';
import checkWinner from '../../../components/tic-tac-toe-board/functions/checkWinner';
import { BoardValuesEnum } from '../../../types/BoardValues';
import useGameStatus from '../hooks/useGameStatus';
import useGameMoveUpdate from '../hooks/useGameMoveUpdate';
import PlayerGameProfile from './components/PlayerGameProfile';
import './OnlineMatchPage.scss';
import useOnlineGameContext from '../context/useOnlineGameContext';
import EndGameModal from '../modal/EndGameModal';
import GameCanceled from '../modal/GameCanceled';
import ChatToggler from './components/chat/ChatToggler';

const { XSign, OSign } = BoardValuesEnum;

function OnlineMatchPage() {
  const { socket, gameOver, board, currentGameInfo } = useOnlineGameContext();
  const {
    playerOne: { socketId: playerOneId },
    playerTwo: { socketId: playerTwoId },
    gameId,
  } = currentGameInfo;
  const currentPlayer =
    socket?.id === playerOneId
      ? currentGameInfo.playerOne
      : currentGameInfo.playerTwo;

  const opponentPlayer =
    socket?.id === playerOneId
      ? currentGameInfo.playerTwo
      : currentGameInfo.playerOne;

  const PLAYER_SIGN = playerOneId === socket?.id ? XSign : OSign;
  const { canPlay } = useGameMoveUpdate(playerOneId);
  const { scores, endGameMessage } = useGameStatus();

  const toggleTurn = () => {
    let updatedTurn = '';

    if (canPlay === playerOneId) {
      updatedTurn = playerTwoId;
    } else {
      updatedTurn = playerOneId;
    }

    return updatedTurn;
  };

  const handleCellClick = (cellIndex: number) => {
    const updateBoard = board.map((value, boardIndex) => {
      if (boardIndex === cellIndex) {
        return PLAYER_SIGN;
      }
      return value;
    });

    socket?.emit('game-move', {
      board: updateBoard,
      playerTurn: toggleTurn(),
      gameId,
    });

    const { winner, winPattern, isTie } = checkWinner(updateBoard);
    if (winner) {
      socket?.emit('round-over', {
        winner,
        winningPattern: winPattern,
        gameId,
      });
    }
    if (isTie) {
      socket?.emit('round-over', {
        isTie: true,
        gameId,
      });
    }
  };

  const boardInactiveMessage = (
    <div className="online-inactive-board">
      <h1>{endGameMessage.headerText}</h1>
      <div className="online-inactive-board-main">
        <p>{endGameMessage.mainText}</p>
        {endGameMessage.buttonText && (
          <button type="button" onClick={endGameMessage.onClick}>
            {endGameMessage.buttonText}
          </button>
        )}
      </div>
    </div>
  );

  const timerFunction = useCallback(() => {
    const loserSign = PLAYER_SIGN;

    if (canPlay === socket?.id) {
      socket?.emit('round-over', {
        gameId,
        winnerByTime: loserSign === XSign ? OSign : XSign,
      });
    }
  }, [canPlay, PLAYER_SIGN, gameId, socket]);

  return (
    <>
      <ChatToggler />
      <EndGameModal />
      <GameCanceled />
      <div className="online-match-container">
        {/* <p>X: {scores.xScore}</p>
        <p>tie: {scores.tie}</p>
        <p>O: {scores.oScore}</p> */}
        <div className="online-match-board-container">
          <PlayerGameProfile
            {...{
              isPlaying:
                canPlay === opponentPlayer.socketId && !gameOver.isOver,
              playerScore: 0,
              playerName: opponentPlayer.name,
              playerImage: opponentPlayer.imageId,
              timerFunction,
              gameLive: !gameOver.isOver,
            }}
          />

          <div className="board-container">
            <Board
              board={board}
              onClick={handleCellClick}
              gameOver={gameOver}
              isCellsActive={canPlay === socket?.id}
              inactiveMessage={boardInactiveMessage}
            />
          </div>

          <PlayerGameProfile
            {...{
              isPlaying: canPlay === currentPlayer.socketId && !gameOver.isOver,
              playerScore: 0,
              playerName: currentPlayer.name,
              playerImage: currentPlayer.imageId,
              timerFunction,
              gameLive: !gameOver.isOver,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default OnlineMatchPage;
