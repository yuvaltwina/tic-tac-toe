import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import InputField from '../components/inputField/InputField';
import './LoginModal.scss';
import { TinputProps } from '../../../types/types';
import SubmitButton from '../components/submitButton/SubmitButton';
import {
  MODAL_NEVIGATION_OPTIONS,
  SERVER_FAILED_ERROR,
} from '../../../utils/data';
import { loginValidationSchema } from '../../../utils/validation/userValidation';

const TITLE_TEXT = 'LOGIN';
const CHANGE_PAGE_TEXT = 'Dont have an account?';
const UNAUTHORIZED_TEXT = 'Wrong Username or Password';
const { VITE_SERVER_URL } = import.meta.env;
const SERVER_LOGIN_URL = `${VITE_SERVER_URL}/user/login`;
const { REGISTER } = MODAL_NEVIGATION_OPTIONS;
interface IinitialValue {
  username: string;
  password: string;
}
const initialValues: IinitialValue = {
  username: '',
  password: '',
};
type Tprops = {
  setModalPage: React.Dispatch<React.SetStateAction<string>>;
  closeModal: () => void;
};
function LoginModal({ setModalPage, closeModal }: Tprops) {
  const [isAuthorized, setIsAuthorized] = useState(true);
  function errorHandler(error: any) {
    const errorMessage = error?.response?.data?.message
      ? error.response.data.message
      : '';
    if (errorMessage === 'unauthorized') {
      setIsAuthorized(false);
    } else {
      toast.error(SERVER_FAILED_ERROR);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (formik.isValid && formik.dirty) {
        setIsAuthorized(true);
        const { username, password } = values;
        try {
          await axios.post(SERVER_LOGIN_URL, {
            username,
            password,
          });
          resetForm();
          closeModal();
        } catch (error: any) {
          errorHandler(error);
        }
      }
    },
  });
  const {
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
    handleSubmit,
    isSubmitting,
  } = formik;

  const inputPropsGenerator = (
    id: keyof IinitialValue
  ): TinputProps & { id: string } => {
    const uppercaseId = id[0].toUpperCase() + id.slice(1);
    const inputProps = {
      id,
      type: id,
      placeholder: `Enter your ${uppercaseId}`,
      onBlur: handleBlur,
      value: values[id],
      onChange: handleChange,
      error: !!(touched[id] && errors[id]),
      autoComplete: 'on',
      required: true,
    };
    return inputProps;
  };
  const displayInputFields = Object.keys(initialValues).map((id) => (
    <InputField
      key={id}
      inputProps={inputPropsGenerator(id as keyof IinitialValue)}
      errorMessage={errors[id as keyof IinitialValue]}
    />
  ));
  const displayUnauthorizedError = !isAuthorized ? (
    <p className="login-unauthorized">{UNAUTHORIZED_TEXT}</p>
  ) : null;

  return (
    <div className="login-modal">
      <h1 className="login-title">{TITLE_TEXT}</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {displayInputFields}
        {displayUnauthorizedError}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      <button
        onClick={() => setModalPage(REGISTER)}
        type="button"
        className="login-to-register-button"
      >
        {CHANGE_PAGE_TEXT}
      </button>
    </div>
  );
}

export default LoginModal;
