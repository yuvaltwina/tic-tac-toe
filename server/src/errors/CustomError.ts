class CustomError extends Error {
  status: number;
  message: string;
  constructor(status: number = 500, message: string = 'internal server error') {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default CustomError;
