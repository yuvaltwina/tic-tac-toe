import React from 'react';
import MainButton from '../../components/Main-button/MainButton';
import SiteTitle from '../../components/Site-title/SiteTitle';
import './MainPage.scss';

function MainPage() {
  return (
    <div className="main-page">
      <SiteTitle />
      <div className="buttons-container">
        <MainButton>Play against computer</MainButton>
        <MainButton>Play against friend</MainButton>
        <MainButton>Play with friend</MainButton>
      </div>
    </div>
  );
}

export default MainPage;
