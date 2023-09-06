import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputField from '../components/inputField/InputField';
import './RegisterModal.scss';
import { registerValidationSchema } from '../../../utils/validation/userValidation';
import { createUser } from '../../../utils/apiService/axiosRequets';
import ErrorHandler from '../../../utils/ErrorHandler';
import SubmitButton from '../components/submitButton/SubmitButton';

const CREATING_USER_TEXT = 'Creating User';
const CREATED_USER_TEXT = 'User Created Sucssesfully';

type RegisterModalProps = {
  closeModal: () => void;
};
type InitialValues = typeof initialValues;

type TextFieldArray = {
  id: keyof InitialValues;
  placeHolder: string;
  type: string;
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
  },
  {
    id: 'password',
    placeHolder: 'Enter Your Password',
    type: 'password',
  },
];

function RegisterModal({ closeModal }: RegisterModalProps) {
  const submitHandler = async (
    values: InitialValues,
    resetForm: () => void
  ) => {
    const { username, password } = values;
    const loadingToastId = toast.loading(CREATING_USER_TEXT);
    try {
      await createUser(username, password);
      toast.success(CREATED_USER_TEXT, { id: loadingToastId });
      closeModal();
      resetForm();
    } catch (error) {
      const errorMessage = ErrorHandler(error);
      toast.error(errorMessage, {
        id: loadingToastId,
      });
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
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await submitHandler(values, resetForm);
    },
  });

  const displayInputFields = textFieldArray.map(({ id, type, placeHolder }) => (
    <InputField
      key={id}
      errorMessage={errors[id]}
      inputProps={{
        id,
        type,
        required: true,
        placeholder: placeHolder,
        onBlur: handleBlur,
        value: values[id],
        onChange: handleChange,
        error: touched[id] && Boolean(errors[id]),
      }}
    />
  ));

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
