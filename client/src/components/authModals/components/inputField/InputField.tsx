import React from 'react';
import TextField, { FilledTextFieldProps } from '@mui/material/TextField';

interface InputFieldProps extends FilledTextFieldProps {
  label: string;
}

function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className="modal-input-container">
      <h3 className="modal-input-label">{label}</h3>
      <TextField autoComplete="on" {...props} className="modal-input" />
    </div>
  );
}

export default InputField;
