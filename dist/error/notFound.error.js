"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = __importDefault(require("./customErrors"));
class NotFoundError extends customErrors_1.default {
    constructor(message, property) {
        super(message);
        this.property = property;
        this.errorCode = 404;
        this.errorType = 'Notfound error';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, property: this.property }];
    }
}
exports.default = NotFoundError;
