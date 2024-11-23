import CustomError from './customErrors';

class NotFoundError extends CustomError {
  errorCode = 404;
  errorType = 'Notfound error';

  constructor(
    message: string,
    private property?: string,
  ) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, property: this.property }];
  }
}

export default NotFoundError;
