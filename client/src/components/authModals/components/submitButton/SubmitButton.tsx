import React from 'react';
import './SubmitButton.scss';

type SubmitButtonProp = { isSubmitting: boolean; formId: string };

function SubmitButton({ isSubmitting, formId }: SubmitButtonProp) {
  return (
    <button
      form={formId}
      type="submit"
      disabled={isSubmitting}
      className="modal-submit"
    >
      SUBMIT
    </button>
  );
}

export default SubmitButton;
