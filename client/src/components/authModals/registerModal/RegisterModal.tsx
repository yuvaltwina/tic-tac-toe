import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputField from '../components/inputField/InputField';
import './RegisterModal.scss';
import { Navigate, InputProps } from '../../../types/types';
import SubmitButton from '../components/submitButton/SubmitButton';
import { SERVER_FAILED_ERROR } from '../../../utils/data';
import { registerValidationSchema } from '../../../utils/validation/userValidation';
import { createUser } from '../../../utils/apiService/axiosRequets';

const CHANGE_PAGE_TEXT = 'Already got an account?';
const CREATING_USER_TEXT = 'Creating User';
const CREATED_USER_TEXT = 'User Created Sucssesfully';
const DUPLICATE_USERNAME_TEXT = 'Username Already Taken';

interface FormInitialValue {
  username: string;
  password: string;
}
const initialValues: FormInitialValue = {
  username: '',
  password: '',
};
type Props = {
  navigate: Navigate;
  closeModal: () => void;
};

function RegisterModal({ navigate, closeModal }: Props) {
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
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isValid && dirty) {
        const { username, password } = values;
        const loadingToastId = toast.loading(CREATING_USER_TEXT);
        try {
          await createUser(username, password);
          toast.success(CREATED_USER_TEXT, { id: loadingToastId });
          closeModal();
          resetForm();
        } catch (error: any) {
          errorHandler(loadingToastId, error);
        }
      }
    },
  });

  const inputPropsGenerator = (
    id: keyof FormInitialValue
  ): InputProps & { id: string } => {
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
      inputProps={inputPropsGenerator(id as keyof FormInitialValue)}
      errorMessage={errors[id as keyof FormInitialValue]}
    />
  ));

  return (
    <div className="register-modal">
      <form onSubmit={handleSubmit} className="register-form">
        {displayInputFields}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
      <button
        onClick={navigate.toLoginPage}
        type="button"
        className="register-to-login-button"
      >
        {CHANGE_PAGE_TEXT}
      </button>
    </div>
  );
}

export default RegisterModal;
