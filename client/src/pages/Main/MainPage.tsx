import React from 'react';
import { useNavigate } from 'react-router';
import MainButton from '../../components/Main-button/MainButton';
import SiteTitle from '../../components/Site-title/SiteTitle';
import { routesData } from '../../utils/data';
import './MainPage.scss';

function MainPage() {
  const { linkPage, online, computer } = routesData;
  const navigate = useNavigate();
  const buttonsArray = [
    { name: 'Play against computer', route: computer },
    { name: 'Play against friend', route: linkPage },
    { name: 'Play online', route: online },
  ];

  return (
    <div className="main-page">
      <SiteTitle />
      <div className="buttons-container">
        {buttonsArray.map(({ name, route }) => (
          <MainButton key={route} onClick={() => navigate(route)}>
            {name}
          </MainButton>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
