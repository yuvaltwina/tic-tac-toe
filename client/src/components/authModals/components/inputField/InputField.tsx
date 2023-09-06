import React from 'react';
import TextField, {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from '@mui/material/TextField';
import './InputField.scss';
import FormHelperText from '@mui/material/FormHelperText';
import { BiSolidError } from 'react-icons/bi';

type InputProps =
  | FilledTextFieldProps
  | OutlinedTextFieldProps
  | StandardTextFieldProps;

interface InputFieldProps {
  errorMessage: string | undefined;
  inputProps: InputProps;
}
function InputField({ inputProps, errorMessage }: InputFieldProps) {
  const isError = !!errorMessage;
  const displayError = isError && inputProps.error && (
    <FormHelperText error={isError} className="modal-input-error">
      <BiSolidError />
      {errorMessage}
    </FormHelperText>
  );

  return (
    <div className="modal-input-container">
      <h3 className="modal-input-label">{inputProps.id}</h3>
      <TextField autoComplete="on" {...inputProps} className="modal-input" />
      {displayError}
    </div>
  );
}

export default InputField;
