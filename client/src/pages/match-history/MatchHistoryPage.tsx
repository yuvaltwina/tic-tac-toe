import React, { Suspense } from 'react';
import { Await, defer } from 'react-router';
import SiteTitle from '../../components/Site-title/SiteTitle';
import useLoaderData from '../../hooks/useLoaderData';
import { getData } from '../../utils/data';
import MatchHistoryFallback from './MatchHistoryFallback';
import './MatchHistoryPage.scss';

type MatchHistory = {
  name: string;
  name2: string;
  score: string;
  gameStatus: 'win' | 'lose' | 'tie';
};

const DUMMY_DATA: MatchHistory[] = [
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'win' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'lose' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'tie' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'win' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'win' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'win' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'win' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'win' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'win' },
  { name: 'Player1', name2: 'player2', score: '1:0:1', gameStatus: 'win' },
];

const gameStatusIcons = {
  win: <img src="/match-history/Win-icon.svg" alt="win" />,
  lose: <img src="/match-history/Lose-icon.svg" alt="lose" />,
  tie: 'tie',
};
function MatchHistoryPageLoader({ request: { signal } }) {
  return defer({ data: getData(true, DUMMY_DATA) });
}

function MatchHistoryPage() {
  const { data } = useLoaderData<typeof DUMMY_DATA>();

  return (
    <div className="match-history-container">
      <SiteTitle>
        <SiteTitle.SubTitle>match history</SiteTitle.SubTitle>
      </SiteTitle>
      <div className="match-history-invisible-div">
        <img
          src="/match-history/VS-icon.svg"
          alt="vs"
          className="match-history-vs-icon"
        />
      </div>
      <div className="match-history-games-container">
        <div className="match-history-games">
          <Suspense fallback={<MatchHistoryFallback />}>
            <Await resolve={data} errorElement={<p>Error loading data</p>}>
              {(data) =>
                data.map(
                  ({ name, name2, score, gameStatus }: any, index: number) => (
                    <div key={index} className="match-history-game">
                      <div className="match-history-profile-container">
                        <div className="match-history-profile-image" />
                        <p>{name}</p>
                      </div>
                      <div className="match-history-score-container">
                        <span className="match-history-score-icon">
                          {
                            gameStatusIcons[
                              gameStatus as keyof typeof gameStatusIcons
                            ]
                          }
                        </span>
                        <span className="match-history-score">{score}</span>
                      </div>
                      <div className="match-history-profile-container">
                        <div className="match-history-profile-image" />
                        <p>{name2}</p>
                      </div>
                    </div>
                  )
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
const MatchHistoryPageRoute = {
  loader: MatchHistoryPageLoader,
  element: <MatchHistoryPage />,
};
export default MatchHistoryPageRoute;
