import React, { useState } from 'react';
import Board from '../../../components/tic-tac-toe-board/Board';
import { BoardValues, BoardValuesEnum } from '../../../types/BoardValues';
import TurnTimer from './components/TurnTimer';
import './OnlineMatchPage.scss';

const { XSign, OSign, emptySign } = BoardValuesEnum;

const defaultSquares = new Array(9).fill(emptySign);

const startingScores = { xScore: 0, oScore: 0, tie: 0 };

function OnlineMatchPage() {
  const [xPlaying, setXPlaying] = useState(true);

  const [board, setBoard] = useState<BoardValues[]>(defaultSquares);
  const [gameOver, setGameOver] = useState<GameOver>({
    isOver: false,
    winningPattern: [0, 0, 0],
    isTie: false,
  });

  const [scores, setScores] = useState(startingScores);
  const [computerMode, setComputerMode] = useState({
    turn: false,
    active: false,
  });
  const handleCellClick = () => {
    setXPlaying((prev) => !prev);
  };

  const timerFunction = () => {
    console.log('end');
    // setXPlaying((prev) => !prev);
  };

  const player = (
    isPlaying: boolean,
    {
      playerScore,
      playerName,
      playerImage,
    }: { playerScore: number; playerName: string; playerImage: string }
  ) => (
    <div
      className={`online-match-player ${
        isPlaying && 'online-match-highlight-player'
      }`}
    >
      {isPlaying && <TurnTimer endTimeFunction={timerFunction} time={10} />}
      <span className="user-profile" />
      <p className="user-score">
        Total score
        <span> {playerScore}</span>
      </p>
      <p className="user-name">{playerName}</p>
    </div>
  );

  return (
    <div className="online-match-container">
      <div className="online-match-board-container">
        {player(xPlaying, {
          playerScore: 333,
          playerName: 'yuval',
          playerImage: 'string',
        })}
        <Board
          board={board}
          onClick={handleCellClick}
          gameOver={gameOver}
          isCellsActive={!computerMode.turn}
        />
        {player(!xPlaying, {
          playerScore: 333,
          playerName: 'yuval',
          playerImage: 'string',
        })}
      </div>
    </div>
  );
}

export default OnlineMatchPage;
