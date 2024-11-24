"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = __importDefault(require("./customErrors"));
class ValidationError extends customErrors_1.default {
    constructor(message, property) {
        super(message);
        this.property = property;
        this.errorCode = 400;
        this.errorType = 'Validation Error';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, property: this.property }];
    }
}
exports.default = ValidationError;
