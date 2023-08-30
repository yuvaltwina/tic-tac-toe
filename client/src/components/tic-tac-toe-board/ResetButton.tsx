import React from 'react';
import './ResetButton.scss';

interface ResetButtonProps {
  onClick: () => void;
}
function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button className="board-reset-button" type="button" onClick={onClick}>
      Reset
    </button>
  );
}

export default ResetButton;
