import React from 'react';
import SiteTitle from '../../components/Site-title/SiteTitle';
import './BracketPage.scss';

const DUMMY_DATA = [
  { name: 'yuwerval', score: 100 },
  { name: 'yuwerval', score: 100 },
  { name: 'yuvrw', score: 1343400 },
  { name: 'yuvae edawdwa ', score: 100 },
  { name: 'yuvrwrweral', score: 100 },
];
function BracketPage() {
  return (
    <div className="bracket-container">
      <SiteTitle>
        <SiteTitle.SubTitle>brackets</SiteTitle.SubTitle>
      </SiteTitle>
      <div className="bracket-data-container">
        <div className="bracket-row bracket-header">
          <h1 className="bracket-header player">player</h1>
          <img alt="bracket" src="/trophy-icon.svg" className="bracket-icon" />
          <h1 className="bracket-header points">points</h1>
        </div>
        {DUMMY_DATA.map(({ name, score }) => (
          <div key={name} className="bracket-row users-data">
            <div className="user">
              <div className="user-profile"> </div>
              <p>{name}</p>
            </div>
            <div className="score-container">
              <div className="score">
                <p>{score}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BracketPage;
