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
    .toFloat()
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 1 })
    .withMessage('Price must be a positive number'),
  check('rooms')
    .toInt()
    .isInt({ min: 1 })
    .withMessage('Rooms must be an integer greater than 0'),
  check('size')
    .toFloat()
    .isNumeric()
    .withMessage('Size must be a number')
    .isFloat({ min: 1 })
    .withMessage('Size must be a positive number'),
  check('street')
    .notEmpty()
    .withMessage('Street is required')
    .isLength({ min: 5 })
    .withMessage('Street must be at least 5 characters long'),
  check('city')
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 5 })
    .withMessage('City must be at least 5 characters long'),
  check('zip')
    .notEmpty()
    .withMessage('Zip is required')
    .isLength({ min: 3 })
    .withMessage('Zip must be at least 3 characters long'),
  check('country')
    .notEmpty()
    .withMessage('Country is required')
    .isLength({ min: 2 })
    .withMessage('Country must be at least 2 characters long'),
  check('developerName')
    .notEmpty()
    .withMessage('Developer name is required')
    .isLength({ min: 2 })
    .withMessage('Developer name must be at least 2 characters long'),
  check('developerDescription')
    .notEmpty()
    .withMessage('Developer description is required')
    .isLength({ min: 10 })
    .withMessage('Developer description must be at least 10 characters long'),
  check('projectName')
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ min: 2 })
    .withMessage('Project name must be at least 2 characters long'),
];

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req.body);
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
