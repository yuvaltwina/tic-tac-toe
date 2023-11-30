import SiteTitle from '../../components/Site-title/SiteTitle';
import { useUserSelector } from '../../redux/selectors';
import { useGetMatchHistory } from '../../utils/apiService/getRequest/hooks';
import MatchHistoryFallback from './MatchHistoryFallback';
import getUserImageSrc from '../../utils/getUserImageSrc';
import './MatchHistoryPage.scss';

const gameStatusIcons = {
  win: <img src="/match-history/Win-icon.svg" alt="win" />,
  lose: <img src="/match-history/Lose-icon.svg" alt="lose" />,
  tie: <img src="/match-history/Tie-icon.svg" alt="lose" />,
};

function MatchHistoryPage() {
  const { data, isError, isLoading } = useGetMatchHistory();
  const {
    userData: { username },
  } = useUserSelector();
  const { data: { payload } = { payload: null } } = data || {};

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
          {isLoading && <MatchHistoryFallback />}

          {isError && <h1>Failed load brackets</h1>}

          {payload &&
            payload?.map(
              ({
                scores,
                playerOne,
                playerTwo,
                gameWinner,
                matchId,
                gameCanceled,
              }) => {
                const { oScore, xScore, tie } = scores;
                let connectedUser;
                let opponentUser;

                if (playerOne.username === username) {
                  connectedUser = { ...playerOne, score: xScore };
                  opponentUser = { ...playerTwo, score: oScore };
                } else {
                  connectedUser = { ...playerTwo, score: oScore };
                  opponentUser = { ...playerOne, score: xScore };
                }

                const {
                  username: connectedUserName,
                  imageId: connectedUserImageId,
                } = connectedUser;

                const {
                  username: opponentUserName,
                  imageId: opponentUserImageId,
                } = opponentUser;

                const isConnectedPlayerWon =
                  gameWinner === username ? 'win' : 'lose';

                const matchIconToDisplay = gameWinner
                  ? isConnectedPlayerWon
                  : 'tie';

                return (
                  <div key={matchId} className="match-history-game">
                    <div className="match-history-profile-container">
                      <img
                        alt="user-profile"
                        src={getUserImageSrc(connectedUserImageId)}
                        className="match-history-profile-image"
                      />
                      <p>{connectedUserName}</p>
                    </div>
                    <div className="match-history-score-container">
                      <span className="match-history-score-icon">
                        {
                          gameStatusIcons[
                            matchIconToDisplay as keyof typeof gameStatusIcons
                          ]
                        }
                      </span>
                      <span className="match-history-score">
                        {!gameCanceled
                          ? `${connectedUser.score}:${tie}:${opponentUser.score}`
                          : 'Canceled'}
                      </span>
                    </div>
                    <div className="match-history-profile-container justify-end">
                      <img
                        alt="user-profile"
                        src={getUserImageSrc(opponentUserImageId)}
                        className="match-history-profile-image"
                      />
                      <p>{opponentUserName}</p>
                    </div>
                  </div>
                );
              }
            )}
          {payload?.length === 0 && <h1>No history found</h1>}
        </div>
      </div>
    </div>
  );
}

export default MatchHistoryPage;
