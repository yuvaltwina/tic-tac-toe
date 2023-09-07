import { Skeleton } from '@mui/material';
import React from 'react';
import './BracketPage.scss';

function BracketPageFallback() {
  return (
    <>
      {new Array(5).fill(null).map((_data, index) => (
        <div key={index} className="bracket-row bracket-users-data">
          <div className="bracket-user">
            <Skeleton
              className="bracket-user-profile"
              animation="wave"
              variant="circular"
            />
            <Skeleton animation="wave" variant="text" width="80%" />
          </div>
          <div className="bracket-score-container">
            <Skeleton animation="wave" variant="text" width="80%" />
          </div>
        </div>
      ))}
    </>
  );
}

export default BracketPageFallback;
