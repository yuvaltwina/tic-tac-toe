import React from 'react';
import './SubmitButton.scss';

type SubmitButtonProp = { isSubmitting: boolean };

function SubmitButton({ isSubmitting }: SubmitButtonProp) {
  return (
    <button
      form="authForm"
      type="submit"
      disabled={isSubmitting}
      className="modal-submit"
    >
      SUBMIT
    </button>
  );
}

export default SubmitButton;
