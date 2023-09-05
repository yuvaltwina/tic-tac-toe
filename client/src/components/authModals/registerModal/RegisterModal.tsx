import React, { forwardRef, useImperativeHandle } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import InputField from '../components/inputField/InputField';
import './RegisterModal.scss';
import { registerValidationSchema } from '../../../utils/validation/userValidation';
import { createUser } from '../../../utils/apiService/axiosRequets';
import ErrorHandler from '../../../utils/ErrorHandler';

const CREATING_USER_TEXT = 'Creating User';
const CREATED_USER_TEXT = 'User Created Sucssesfully';

type Props = {
  closeModal: () => void;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
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
function RegisterModal({ closeModal, setIsSubmitting }: Props, ref: any) {
  const submitHandler = async (
    values: InitialValues,
    resetForm: () => void
  ) => {
    setIsSubmitting(true);
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
    setIsSubmitting(false);
  };

  const {
    handleBlur,
    submitForm,
    handleChange,
    touched,
    values,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: registerValidationSchema,
    onSubmit: (values, { resetForm }) => submitHandler(values, resetForm),
  });

  useImperativeHandle(ref, () => ({
    submitForm,
  }));

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

  return (
    <div className="register-modal">
      <form ref={ref} onSubmit={handleSubmit} className="register-form">
        {displayInputFields}
      </form>
    </div>
  );
}

export default forwardRef(RegisterModal);
