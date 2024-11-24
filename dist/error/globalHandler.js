"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = __importDefault(require("./customErrors"));
const globalErrorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    if (error instanceof customErrors_1.default) {
        res.status(error.errorCode).json({
            success: false,
            errorCode: error.errorCode,
            errorType: error.errorType,
            errors: error.serializeErrors(),
        });
        return;
    }
    // Handle unexpected errors
    res.status(500).json({
        success: false,
        errorCode: 500,
        errorType: 'InternalServerError',
        errors: [{ message: error.message || 'An unexpected error occurred' }],
    });
};
exports.default = globalErrorHandler;
