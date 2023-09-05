import { AxiosError } from 'axios';

const ErrorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message;
    if (errorMessage) {
      return errorMessage;
    }
  }

  return 'Something went wrong please try again later';
};

export default ErrorHandler;
