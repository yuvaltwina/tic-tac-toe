/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from '@mui/material/TextField';

export type TinputProps =
  | FilledTextFieldProps
  | OutlinedTextFieldProps
  | StandardTextFieldProps;
