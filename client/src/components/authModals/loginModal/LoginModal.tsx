import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import InputField from '../components/inputField/InputField';
import { loginValidationSchema } from '../../../utils/validation/userValidation';
import { checkLoginDetails } from '../../../utils/apiService/axiosRequets';
import { login } from '../../../utils/reduxState/user';
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
  { id: 'username', placeHolder: 'username', type: 'text', label: 'username' },
  {
    id: 'password',
    placeHolder: 'password',
    type: 'password',
    label: 'username',
  },
];

const UNAUTHORIZED_TEXT = 'Wrong Username or Password';

function LoginModal({ closeModal }: LoginModalProps) {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const dispatch = useDispatch();

  const submitHandler = async (
    values: InitialValues,
    resetForm: () => void
  ) => {
    const { username, password } = values;

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
    onSubmit: (values, { resetForm }) => {
      submitHandler(values, resetForm);
    },
  });

  const displayInputFields = textFieldArray.map(
    ({ id, label, type, placeHolder }) => (
      <InputField
        key={id}
        id={id}
        variant="filled"
        label={label}
        type={type}
        required
        placeholder={placeHolder}
        onBlur={handleBlur}
        value={values[id]}
        onChange={handleChange}
        error={touched[id] && Boolean(errors[id])}
        helperText={touched[id] && errors[id]}
      />
    )
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
