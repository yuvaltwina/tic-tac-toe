import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { routesData } from '../../utils/data';
import LeaderBoardButton from './bracket-button/BracketButton';
import LoginButton from './Login-button/LoginButton';
import ReturnButton from './return-button/ReturnButton';
import './NavBar.scss';

 const { bracketPage, mainPage, linkPage, computer, online, matchHistory } =
  routesData;

const leftButton = {
  [mainPage]: { element: <LeaderBoardButton />, toRoute: bracketPage },
  [bracketPage]: { element: <ReturnButton />, toRoute: mainPage },
  [linkPage]: { element: <ReturnButton />, toRoute: mainPage },
  [computer]: { element: <ReturnButton />, toRoute: mainPage },
  [online]: { element: <ReturnButton />, toRoute: mainPage },
  [matchHistory]: { element: <ReturnButton />, toRoute: mainPage },
};

function NavBar() {
  const { pathname } = useLocation();

  return (
    <div className="nav-bar">
      <Link className="link-class" to={leftButton[pathname].toRoute}>
        {leftButton[pathname].element || <div />}
      </Link>
      <LoginButton />
    </div>
  );
}

export default NavBar;
