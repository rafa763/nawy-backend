"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const notFound_error_1 = __importDefault(require("../error/notFound.error"));
const validation_error_1 = __importDefault(require("../error/validation.error"));
const property_model_1 = require("../model/property.model");
const ai_1 = require("../utils/ai");
const s3_1 = require("../utils/s3");
class PropertyService {
    constructor() {
        this.propertyModel = new property_model_1.Property();
    }
    getProperty(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.propertyModel.get(id);
            if (!data) {
                throw new notFound_error_1.default('Property not found');
            }
            return data;
        });
    }
    getProperties(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.propertyModel.getAll(page, size);
            return data;
        });
    }
    searchProperties(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.propertyModel.searchProperties(query);
            return data;
        });
    }
    createProperty(property, image) {
        return __awaiter(this, void 0, void 0, function* () {
            const valid = yield new ai_1.AIValidator().verifyUserInput(property);
            if (!valid) {
                throw new validation_error_1.default('Invalid input (Offensive language or spam)');
            }
            property.imageUrl = yield (0, s3_1.uploadFile)(image);
            const ans = yield this.propertyModel.save(property);
            return ans;
        });
    }
}
exports.PropertyService = PropertyService;
