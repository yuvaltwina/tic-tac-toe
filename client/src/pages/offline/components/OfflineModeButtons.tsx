import React from 'react';
import './OfflineModeButtons.scss';

interface OfflineModeButtonsProps {
  resetFunction: () => void;
  switchModeFunction: () => void;
  isComputerModeActive: boolean;
}
function OfflineModeButtons({
  resetFunction,
  switchModeFunction,
  isComputerModeActive,
}: OfflineModeButtonsProps) {
  return (
    <div className="offline-mode-buttons-container">
      <button
        className="offline-mode-button"
        type="button"
        onClick={resetFunction}
      >
        Reset
      </button>
      <button
        className="offline-mode-button"
        type="button"
        onClick={switchModeFunction}
      >
        {isComputerModeActive ? 'COM' : '2P'}
      </button>
    </div>
  );
}

export default OfflineModeButtons;
