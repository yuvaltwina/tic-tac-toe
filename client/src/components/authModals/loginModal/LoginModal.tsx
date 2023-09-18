import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { InputAdornment } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import InputField from '../components/inputField/InputField';
import { loginValidationSchema } from '../../../utils/validation/userValidation';
import { checkLoginDetails } from '../../../utils/apiService/axiosRequets';
import { login } from '../../../redux/user';
import ErrorHandler from '../../../utils/ErrorHandler';

import './LoginModal.scss';
import SubmitButton from '../components/submitButton/SubmitButton';

type LoginModalProps = {
  closeModal: () => void;
};

type InitialValues = typeof initialValues;

type TextFieldArray = {
  id: keyof InitialValues;
  placeHolder: string;
  type: string;
  label: string;
}[];

const initialValues = {
  username: '',
  password: '',
};
const textFieldArray: TextFieldArray = [
  {
    id: 'username',
    placeHolder: 'Enter Your Username',
    type: 'text',
    label: 'Username',
  },
  {
    id: 'password',
    placeHolder: 'Enter Your Password',
    type: 'password',
    label: 'Password',
  },
];

const UNAUTHORIZED_TEXT = 'Wrong Username or Password';

function LoginModal({ closeModal }: LoginModalProps) {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const iconClickHandler = () => setIsPasswordVisible(!isPasswordVisible);
  const submitHandler = async (
    values: InitialValues,
    resetForm: () => void
  ) => {
    const { username, password } = values;
    setIsAuthorized(true);
    try {
      const { formattedUsername, loginToken } = await checkLoginDetails(
        username,
        password
      );
      resetForm();
      dispatch(login({ formattedUsername, loginToken }));
      closeModal();
    } catch (error) {
      const errorMessage = ErrorHandler(error);
      if (errorMessage === 'unauthorized') {
        setIsAuthorized(false);
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const {
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await submitHandler(values, resetForm);
    },
  });

  const displayEyeIcon = isPasswordVisible ? (
    <AiOutlineEye
      className="login-modal-input-icon"
      onClick={iconClickHandler}
    />
  ) : (
    <AiOutlineEyeInvisible
      className="login-modal-input-icon"
      onClick={iconClickHandler}
    />
  );

  const displayInputFields = textFieldArray.map(
    ({ id, type, placeHolder, label }) => {
      const isPasswordInput = id === 'password';
      const iconProperty = isPasswordInput
        ? {
            endAdornment: (
              <InputAdornment position="end">{displayEyeIcon}</InputAdornment>
            ),
          }
        : {};
      const passwordType = isPasswordVisible ? 'text' : 'password';
      const inputType = !isPasswordInput ? type : passwordType;

      return (
        <InputField
          key={id}
          label={label}
          errorMessage={errors[id]}
          inputProps={{
            id,
            type: inputType,
            placeholder: placeHolder,
            onBlur: handleBlur,
            value: values[id],
            onChange: handleChange,
            error: touched[id] && Boolean(errors[id]),
            InputProps: iconProperty,
          }}
        />
      );
    }
  );

  const displayUnauthorizedError = !isAuthorized && (
    <p className="login-unauthorized">{UNAUTHORIZED_TEXT}</p>
  );

  return (
    <div className="login-modal">
      <form onSubmit={handleSubmit} className="login-form">
        {displayInputFields}
        {displayUnauthorizedError}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}

export default LoginModal;
