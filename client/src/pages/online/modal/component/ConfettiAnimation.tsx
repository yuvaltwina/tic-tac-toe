import React, { useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const animationTime = 5 * 1000;

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const canvasStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 100,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

export default function ConfettiAnimation() {
  const refAnimationInstance = useRef<any>(null);

  const getInstance = (instance: any) => {
    refAnimationInstance.current = instance;
  };

  useEffect(() => {
    let animationInterval: any;
    const startAnimation = () => {
      animationInterval = setInterval(() => {
        if (refAnimationInstance.current) {
          refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
          refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
        }
      }, 300);

      setTimeout(() => {
        stopAnimation();
      }, animationTime);
    };

    const stopAnimation = () => {
      clearInterval(animationInterval);
    };

    // Start the animation initially
    startAnimation();

    // Clean up the animationInterval when the component unmounts
    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />;
}
