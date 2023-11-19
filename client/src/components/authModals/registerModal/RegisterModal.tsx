import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputField from '../components/inputField/InputField';
import './RegisterModal.scss';
import { registerValidationSchema } from '../../../utils/validation/userValidation';
import ErrorHandler from '../../../utils/ErrorHandler';
import SubmitButton from '../components/submitButton/SubmitButton';
import useRegisterMutation from '../../../utils/apiService/postRequest/useRegisterMutation';

const onlyLowerCaseAndNumbersRegex = /[^a-z0-9]/g;
const CREATED_USER_TEXT = 'User Created Successesfully';
const USERNAME_EXISTS_ERROR_TEXT = 'Username is already taken';
type RegisterModalProps = {
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
  confirmPassword: '',
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
  {
    id: 'confirmPassword',
    placeHolder: 'Enter Your Password',
    type: 'password',
    label: 'Confirm Password',
  },
];

function RegisterModal({ closeModal }: RegisterModalProps) {
  const onSuccess = (resetForm: () => void, loadingToastId: string) => {
    toast.success(CREATED_USER_TEXT, { id: loadingToastId });
    closeModal();
    resetForm();
  };

  const onError = (error: unknown, loadingToastId: string) => {
    const errorMessage = ErrorHandler(error);
    if (errorMessage.includes('Duplicate')) {
      toast.error(USERNAME_EXISTS_ERROR_TEXT, {
        id: loadingToastId,
      });
    } else {
      toast.error(errorMessage, {
        id: loadingToastId,
      });
    }
  };

  const registerMutation = useRegisterMutation(onSuccess, onError);

  const submitHandler = async (
    values: InitialValues,
    resetForm: () => void
  ) => {
    const { username, password } = values;
    registerMutation.mutate({ resetForm, username, password });
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
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await submitHandler(values, resetForm);
    },
  });

  const displayInputFields = textFieldArray.map(
    ({ id, type, placeHolder, label }) => (
      <InputField
        key={id}
        label={label}
        errorMessage={errors[id]}
        inputProps={{
          id,
          type,
          required: true,
          placeholder: placeHolder,
          onBlur: handleBlur,
          value: values[id],
          onChange: (e) => {
            if (id === 'username') {
              const sanitizedValue = e.target.value.replace(
                onlyLowerCaseAndNumbersRegex,
                ''
              );
              e.target.value = sanitizedValue;
            }
            handleChange(e);
          },
          error: touched[id] && Boolean(errors[id]),
        }}
      />
    )
  );

  return (
    <div className="register-modal">
      <form onSubmit={handleSubmit} className="register-form">
        {displayInputFields}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}

export default RegisterModal;
