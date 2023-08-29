import React from 'react';
import { Link } from 'react-router-dom';
import routesData from '../../../utils/data';
import './BracketButton.scss';

function BracketButton() {
  const { bracketPage } = routesData;
  return (
    <Link to={bracketPage} className="bracket-button">
      <img alt="bracket" src="/trophy-icon.svg" />
    </Link>
  );
}

export default BracketButton;
