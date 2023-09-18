import React, { useEffect, useState } from 'react';

interface TurnTimerProps {
  shouldRun: boolean;
  timerDuration: number;
  onTimerEnd: () => void;
}

function TurnTimer({
  shouldRun,
  timerDuration = 30,
  onTimerEnd,
}: TurnTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timerDuration);

  useEffect(() => {
    let timer: any;

    if (shouldRun && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0 && shouldRun) {
      console.log();

      onTimerEnd();
    }

    return () => clearTimeout(timer);
  }, [shouldRun, timeLeft, onTimerEnd]);

  return (
    <div>
      <h2>{timeLeft} seconds</h2>
    </div>
  );
}

export default TurnTimer;
