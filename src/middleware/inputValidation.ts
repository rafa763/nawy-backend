import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import ValidationError from '../error/validation.error';

const propertyValidationRules = (): RequestHandler[] => [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 5 })
    .withMessage('Name must be at least 5 characters long'),
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  check('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 1 })
    .withMessage('Price must be a positive number'),
  check('rooms')
    .isInt({ min: 1 })
    .withMessage('Rooms must be an integer greater than 0'),
  check('size')
    .isNumeric()
    .withMessage('Size must be a number')
    .isFloat({ min: 1 })
    .withMessage('Size must be a positive number'),
  check('address')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 10 })
    .withMessage('Address must be at least 10 characters long'),
];

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }
  next();
};

// Combine the rules and validation into a single export
export const validateProperty: RequestHandler[] = [
  ...propertyValidationRules(),
  validate,
];
