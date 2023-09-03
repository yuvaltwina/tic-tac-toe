import React from 'react';
import './SubmitButton.scss';

type Tprop = { isSubmitting: boolean };

function SubmitButton({ isSubmitting }: Tprop) {
  return (
    <button type="submit" disabled={isSubmitting} className="modal-submit">
      SUBMIT
    </button>
  );
}

export default SubmitButton;
