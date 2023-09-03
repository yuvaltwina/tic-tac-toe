import React from 'react';
import TextField from '@mui/material/TextField';
import './InputField.scss';
import FormHelperText from '@mui/material/FormHelperText';
import { BiSolidError } from 'react-icons/bi';
import { TinputProps } from '../../../../types/types';

type Tprops = {
  inputProps: TinputProps & { id: string };
  errorMessage: string | undefined;
};
// להוסיף שיש ID  בוודאות
function InputField({ inputProps, errorMessage }: Tprops) {
  const isError = !!errorMessage;
  const upperCasedId = inputProps.id[0].toUpperCase() + inputProps.id.slice(1);

  return (
    <div className="modal-input-container">
      <h3 className="modal-input-label">{upperCasedId}</h3>
      <TextField {...inputProps} className="modal-input" />
      {isError && inputProps.error && (
        <FormHelperText error={isError} className="modal-input-error">
          <BiSolidError />
          {errorMessage}
        </FormHelperText>
      )}
    </div>
  );
}

export default InputField;
