import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import InputField from '../components/inputField/InputField';
import './RegisterModal.scss';
import { TinputProps } from '../../../types/types';
import SubmitButton from '../components/submitButton/SubmitButton';
import {
  MODAL_NEVIGATION_OPTIONS,
  SERVER_FAILED_ERROR,
} from '../../../utils/data';
import { registerValidationSchema } from '../../../utils/validation/userValidation';

const { VITE_SERVER_URL } = import.meta.env;
const SERVER_REGISTER_URL = `${VITE_SERVER_URL}/user/register`;
const TITLE_TEXT = 'REGISTER';
const CHANGE_PAGE_TEXT = 'Already got an account?';
const CREATING_USER_TEXT = 'Creating User';
const CREATED_USER_TEXT = 'User Sucssesfully Created';
const DUPLICATE_USERNAME_TEXT = 'Username Already Taken';
const { LOGIN } = MODAL_NEVIGATION_OPTIONS;

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

function RegisterModal({ setModalPage, closeModal }: Tprops) {
  const formik = useFormik({
    initialValues,
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (formik.isValid && formik.dirty) {
        const { username, password } = values;
        const loadingToastId = toast.loading(CREATING_USER_TEXT);
        try {
          await axios.post(SERVER_REGISTER_URL, {
            username,
            password,
          });
          resetForm();
          toast.success(CREATED_USER_TEXT, { id: loadingToastId });
          closeModal();
        } catch (error: any) {
          errorHandler(loadingToastId, error);
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

  return (
    <div className="register-modal">
      <h1 className="register-title">{TITLE_TEXT}</h1>
      <form onSubmit={handleSubmit} className="register-form">
        {displayInputFields}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      <button
        onClick={() => setModalPage(LOGIN)}
        type="button"
        className="register-to-login-button"
      >
        {CHANGE_PAGE_TEXT}
      </button>
    </div>
  );
}

export default RegisterModal;

function errorHandler(loadingToastId: string, error: any) {
  const errorMessage = error?.response?.data?.message
    ? error.response.data.message
    : '';
  if (errorMessage.startsWith('Duplicate entry')) {
    toast.error(DUPLICATE_USERNAME_TEXT, {
      id: loadingToastId,
    });
  } else {
    toast.error(SERVER_FAILED_ERROR, {
      id: loadingToastId,
    });
  }
}
