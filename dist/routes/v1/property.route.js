"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = require("../../controller/property.controller");
const inputValidation_1 = require("../../middleware/inputValidation");
const upload_1 = __importDefault(require("../../middleware/upload"));
const router = (0, express_1.Router)();
const propertyController = new property_controller_1.PropertyController();
router.get('/search', propertyController.searchProperties);
router.get('/:id', propertyController.getProperty);
router.get('/', propertyController.getProperties);
router.post('/', inputValidation_1.validateProperty, upload_1.default.single('image'), propertyController.createProperty);
exports.default = router;
