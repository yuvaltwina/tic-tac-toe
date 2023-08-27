import React from 'react';
import LeaderBoardButton from './leaderboard-button/LeaderBoardButton';
import './NavBar.scss';

function NavBar() {
  return (
    <div className="nav-bar">
      <LeaderBoardButton />
      <button type="button">Login</button>
    </div>
  );
}

export default NavBar;
