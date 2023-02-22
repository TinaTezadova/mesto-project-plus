import { TErrors } from '../types';

class RequestError extends Error {
  statusCode: TErrors;

  constructor(message: string, errorCode: TErrors) {
    super(message);
    this.statusCode = errorCode;
  }
}

export default RequestError;
