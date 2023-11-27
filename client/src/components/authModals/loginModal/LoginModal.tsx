import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { InputAdornment } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import InputField from '../components/inputField/InputField';
import { loginValidationSchema } from '../../../utils/validation/userValidation';
import { login } from '../../../redux/user';
import ErrorHandler from '../../../utils/ErrorHandler';

import './LoginModal.scss';
import SubmitButton from '../components/submitButton/SubmitButton';
import useLoginMutation from '../../../utils/apiService/postRequest/useLoginMutation';
import { UserSliceState } from '../../../redux/types/slices';

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

  const onSuccess = (resetForm: () => void, loginToken: string, userData:UserSliceState['userData']) => {
    resetForm();
    dispatch(login({ loginToken, userData: { ...userData, isLoggedIn: true } }));
    closeModal();
  };

  const onError = (error: unknown) => {
    const errorMessage = ErrorHandler(error);
    if (errorMessage === 'unauthorized') {
      setIsAuthorized(false);
    } else {
      toast.error(errorMessage);
    }
  };
  const loginMutation = useLoginMutation(onSuccess, onError);

  const submitHandler = async (
    values: InitialValues,
    resetForm: () => void
  ) => {
    const { username, password } = values;
    setIsAuthorized(true);
    loginMutation.mutate({ resetForm, username, password });
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
            onChange: (e) => {
              if (id === 'username') {
                e.target.value = e.target.value.toLowerCase();
              }
              handleChange(e);
            },
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
