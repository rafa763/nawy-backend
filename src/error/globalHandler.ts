import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import CustomError from './customErrors';

const globalErrorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error:', error);

  if (error instanceof CustomError) {
    res.status(error.errorCode).json({
      success: false,
      errorCode: error.errorCode,
      errorType: error.errorType,
      errors: error.serializeErrors(),
    });
  }

  // Handle unexpected errors
  res.status(500).json({
    success: false,
    errorCode: 500,
    errorType: 'InternalServerError',
    errors: [{ message: error.message || 'An unexpected error occurred' }],
  });
};

export default globalErrorHandler;
