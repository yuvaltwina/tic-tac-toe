import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputField from '../components/inputField/InputField';
import './LoginModal.scss';
import { Navigate, InputProps } from '../../../types/types';
import SubmitButton from '../components/submitButton/SubmitButton';
import { SERVER_FAILED_ERROR } from '../../../utils/data';
import { loginValidationSchema } from '../../../utils/validation/userValidation';
import { checkLoginDetails } from '../../../utils/apiService/axiosRequets';

const CHANGE_PAGE_TEXT = 'Dont have an account?';
const UNAUTHORIZED_TEXT = 'Wrong Username or Password';

interface InitialValue {
  username: string;
  password: string;
}
const initialValues = {
  username: '',
  password: '',
};
type Props = {
  navigate: Navigate;
  closeModal: () => void;
};
function LoginModal({ navigate, closeModal }: Props) {
  const [isAuthorized, setIsAuthorized] = useState(true);

  function errorHandler(error: any) {
    const errorMessage = error?.response?.data?.message || '';
    if (errorMessage === 'unauthorized') {
      setIsAuthorized(false);
    } else {
      toast.error(SERVER_FAILED_ERROR);
    }
  }

  const {
    handleBlur,
    handleChange,
    touched,
    values,
    errors,
    handleSubmit,
    isSubmitting,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isValid && dirty) {
        setIsAuthorized(true);
        const { username, password } = values;
        try {
          await checkLoginDetails(username, password);
          resetForm();
          closeModal();
        } catch (error: any) {
          errorHandler(error);
        }
      }
    },
  });

  const inputPropsGenerator = (
    id: keyof InitialValue
  ): InputProps & { id: string } => {
    const uppercaseId = id[0].toUpperCase() + id.slice(1);
    const inputProps = {
      id,
      type: id,
      autoComplete: 'on',
      required: true,
      placeholder: `Enter your ${uppercaseId}`,
      onBlur: handleBlur,
      value: values[id],
      onChange: handleChange,
      error: !!(touched[id] && errors[id]),
    };
    return inputProps;
  };

  const displayInputFields = Object.keys(initialValues).map((id) => (
    <InputField
      key={id}
      inputProps={inputPropsGenerator(id as keyof InitialValue)}
      errorMessage={errors[id as keyof InitialValue]}
    />
  ));
  const displayUnauthorizedError = !isAuthorized ? (
    <p className="login-unauthorized">{UNAUTHORIZED_TEXT}</p>
  ) : null;

  return (
    <div className="login-modal">
      <form onSubmit={handleSubmit} className="login-form">
        {displayInputFields}
        {displayUnauthorizedError}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      <button
        onClick={navigate.toRegisterPage}
        type="button"
        className="login-to-register-button"
      >
        {CHANGE_PAGE_TEXT}
      </button>
    </div>
  );
}

export default LoginModal;
