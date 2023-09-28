import React from 'react';
import SiteTitle from '../components/Site-title/SiteTitle';
import './OnlineSearchLoader.scss';

function OnlineSearchLoader() {
  return (
    <div>
      <SiteTitle>ONLINE</SiteTitle>
      <div className="cube-wrapper">
        <div className="cube-folding">
          <span className="leaf1" />
          <span className="leaf2" />
          <span className="leaf3" />
          <span className="leaf4" />
        </div>
        <span className="loading" data-name="Searching">
          Searching
        </span>
      </div>
    </div>
  );
}

export default OnlineSearchLoader;
