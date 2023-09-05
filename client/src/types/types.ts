/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from '@mui/material/TextField';

export type InputProps =
  | FilledTextFieldProps
  | OutlinedTextFieldProps
  | StandardTextFieldProps;

export type Navigate = {
  toRegisterPage: () => void;
  toLoginPage: () => void;
};
export interface UserState {
  user: {
    username: string;
    isLoggedIn: boolean;
  };
}
