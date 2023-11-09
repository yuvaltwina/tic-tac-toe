import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import './MatchHistoryPage.scss';

function MatchHistoryFallback() {
  return (
    <>
      {new Array(7).fill(null).map((_data, index) => (
        <div key={index} className="match-history-game">
          <Skeleton animation="wave" variant="text" width="100%" />
           </div>
      ))}
    </>
  );
}

export default MatchHistoryFallback;
