import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username should have at least 3 characters.')
    .max(11, 'Username should not exceed 11 characters.')
    .matches(
      /^[a-zA-Z][a-zA-Z0-9]/,
      'Username should start with a letter and contain only letters and numbers '
    ),
  password: yup
    .string()

    .required('Password is required')
    .min(6, 'Password should have at least 6 characters.')
    .max(30, 'Password should not exceed 30 characters.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]/,
      'Password  should include both uppercase and lowercase letters and at least one digit'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), ''], 'Passwords do not match'),
});
