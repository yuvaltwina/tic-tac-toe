import SiteTitle from '../../components/Site-title/SiteTitle';
import { useGetTopPointsUsers } from '../../utils/apiService/getRequest/hooks';
import BracketPageFallback from './BracketPageFallback';
import './BracketPage.scss';

function BracketPage() {
  const { data, isError, isLoading } = useGetTopPointsUsers();
  const { data: { payload } = { payload: null } } = data || {};

  return (
    <div className="bracket-container">
      <SiteTitle>
        <SiteTitle.SubTitle>brackets</SiteTitle.SubTitle>
      </SiteTitle>
      <div className="bracket-data-container">
        <div className="bracket-row bracket-header">
          <h1 className="bracket-header bracket-player">player</h1>
          <img alt="bracket" src="/trophy-icon.svg" className="bracket-icon" />
          <h1 className="bracket-header bracket-points">points</h1>
        </div>

        {isLoading && <BracketPageFallback />}

        {isError && <h1>Failed load brackets</h1>}

        {payload?.map(({ username, points }) => (
          <div key={username} className="bracket-row bracket-users-data">
            <div className="bracket-user">
              <div className="bracket-user-profile"> </div>
              <p>{username}</p>
            </div>
            <div className="bracket-score-container">
              <div className="bracket-score">
                <p>{points}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BracketPage;
