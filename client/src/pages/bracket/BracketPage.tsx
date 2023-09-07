import React, { Suspense } from 'react';
import { Await, defer } from 'react-router';
import SiteTitle from '../../components/Site-title/SiteTitle';
import useLoaderData from '../../hooks/useLoaderData';
import { getData } from '../../utils/data';
import './BracketPage.scss';
import BracketPageFallback from './BracketPageFallback';

const DUMMY_DATA = [
  { name: 'yuwerval', score: 100 },
  { name: 'yuwerva', score: 100 },
  { name: 'yuvrw', score: 1343400 },
  { name: 'yuvae edawdwa ', score: 100 },
  { name: 'yuvrwrweral', score: 100 },
];

function BracketPageLoader({ request: { signal } }) {
  return defer({ data: getData(true, DUMMY_DATA) });
}

function BracketPage() {
  const { data } = useLoaderData<typeof DUMMY_DATA>();

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
        <Suspense fallback={<BracketPageFallback />}>
          <Await resolve={data} errorElement={<p>Error loading data</p>}>
            {(users) =>
              users.map(({ name, score }: any) => (
                <div key={name} className="bracket-row bracket-users-data">
                  <div className="bracket-user">
                    <div className="bracket-user-profile"> </div>
                    <p>{name}</p>
                  </div>
                  <div className="bracket-score-container">
                    <div className="bracket-score">
                      <p>{score}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
const BracketPageRoute = {
  loader: BracketPageLoader,
  element: <BracketPage />,
};

export default BracketPageRoute;
