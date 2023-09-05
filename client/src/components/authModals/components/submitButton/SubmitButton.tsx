import React from 'react';
import './SubmitButton.scss';

type SubmitButtonProp = { isSubmitting: boolean; onClick: () => void };

function SubmitButton({ isSubmitting, onClick }: SubmitButtonProp) {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={isSubmitting}
      className="modal-submit"
    >
      SUBMIT
    </button>
  );
}

export default SubmitButton;
