import React from 'react';
import './SubmitButton.scss';
import { BeatLoader } from 'react-spinners';

type SubmitButtonProp = { isSubmitting: boolean };
const SUBMIT_BUTTON_TEXT = 'SUBMIT';
function SubmitButton({ isSubmitting }: SubmitButtonProp) {
  const submitButtonContent = isSubmitting ? (
    <BeatLoader color="#353935" speedMultiplier={0.5} />
  ) : (
    SUBMIT_BUTTON_TEXT
  );
  return (
    <button type="submit" disabled={isSubmitting} className="modal-submit">
      {submitButtonContent}
    </button>
  );
}

export default SubmitButton;
