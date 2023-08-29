import React from 'react';
import LeaderBoardButton from './bracket-button/BracketButton';
import LoginButton from './Login-button/LoginButton';
import './NavBar.scss';

function NavBar() {
  return (
    <div className="nav-bar">
      <LeaderBoardButton />
      <LoginButton />
    </div>
  );
}

export default NavBar;
