import React, { useEffect, useState } from 'react';

interface TurnTimerProps {
  endTimeFunction: () => void;
  time?: number;
}

function TurnTimer({ endTimeFunction, time = 30 }: TurnTimerProps) {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timerId);
        endTimeFunction();
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds, endTimeFunction]);

  return (
    <div>
      <p>{seconds}</p>
    </div>
  );
}

export default TurnTimer;
