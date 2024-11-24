"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProperty = void 0;
const express_validator_1 = require("express-validator");
const validation_error_1 = __importDefault(require("../error/validation.error"));
const propertyValidationRules = () => [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters long'),
    (0, express_validator_1.check)('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long'),
    (0, express_validator_1.check)('price')
        .toFloat()
        .isNumeric()
        .withMessage('Price must be a number')
        .isFloat({ min: 1 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.check)('rooms')
        .toInt()
        .isInt({ min: 1 })
        .withMessage('Rooms must be an integer greater than 0'),
    (0, express_validator_1.check)('size')
        .toFloat()
        .isNumeric()
        .withMessage('Size must be a number')
        .isFloat({ min: 1 })
        .withMessage('Size must be a positive number'),
    (0, express_validator_1.check)('street')
        .notEmpty()
        .withMessage('Street is required')
        .isLength({ min: 5 })
        .withMessage('Street must be at least 5 characters long'),
    (0, express_validator_1.check)('city')
        .notEmpty()
        .withMessage('City is required')
        .isLength({ min: 5 })
        .withMessage('City must be at least 5 characters long'),
    (0, express_validator_1.check)('zip')
        .notEmpty()
        .withMessage('Zip is required')
        .isLength({ min: 3 })
        .withMessage('Zip must be at least 3 characters long'),
    (0, express_validator_1.check)('country')
        .notEmpty()
        .withMessage('Country is required')
        .isLength({ min: 2 })
        .withMessage('Country must be at least 2 characters long'),
    (0, express_validator_1.check)('developerName')
        .notEmpty()
        .withMessage('Developer name is required')
        .isLength({ min: 2 })
        .withMessage('Developer name must be at least 2 characters long'),
    (0, express_validator_1.check)('developerDescription')
        .notEmpty()
        .withMessage('Developer description is required')
        .isLength({ min: 10 })
        .withMessage('Developer description must be at least 10 characters long'),
    (0, express_validator_1.check)('projectName')
        .notEmpty()
        .withMessage('Project name is required')
        .isLength({ min: 2 })
        .withMessage('Project name must be at least 2 characters long'),
];
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req.body);
    if (!errors.isEmpty()) {
        throw new validation_error_1.default(errors.array()[0].msg);
    }
    next();
};
// Combine the rules and validation into a single export
exports.validateProperty = [
    ...propertyValidationRules(),
    validate,
];
