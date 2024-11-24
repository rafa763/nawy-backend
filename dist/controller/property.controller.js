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
exports.PropertyController = void 0;
const property_service_1 = require("../service/property.service");
const validation_error_1 = __importDefault(require("../error/validation.error"));
class PropertyController {
    constructor() {
        this.getProperty = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield this.propertyService.getProperty(id);
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
        this.getProperties = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, size } = req.query;
                const pageNumber = page ? parseInt(page, 10) : 1;
                const sizeNumber = Math.min(size ? parseInt(size, 10) : 10, 20);
                const data = yield this.propertyService.getProperties(pageNumber, sizeNumber);
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
        this.searchProperties = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.query;
                const data = yield this.propertyService.searchProperties(query);
                res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
        this.createProperty = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { name, description, price, rooms, floor, size, street, city, zip, country, developerName, developerDescription, projectName, } = req.body;
                const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
                if (!image) {
                    throw new validation_error_1.default('Image is required');
                }
                const data = yield this.propertyService.createProperty({
                    name,
                    description,
                    price: parseFloat(price),
                    rooms: parseInt(rooms, 10),
                    size: parseFloat(size),
                    imageUrl: null,
                    floor: floor ? parseInt(floor, 10) : null,
                    address: {
                        street,
                        city,
                        zip,
                        country,
                    },
                    developer: {
                        name: developerName,
                        description: developerDescription,
                    },
                    project: {
                        name: projectName,
                    },
                }, image);
                res.status(201).json(data);
            }
            catch (error) {
                next(error);
            }
        });
        this.propertyService = new property_service_1.PropertyService();
    }
}
exports.PropertyController = PropertyController;
