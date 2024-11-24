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
exports.uploadFile = uploadFile;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const short_uuid_1 = __importDefault(require("short-uuid"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
function uploadFile(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Uploading to AWS');
        console.log('data', data);
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: short_uuid_1.default.generate(),
            Body: data,
            ContentType: 'image/jpeg',
        };
        const result = yield s3.upload(params).promise();
        console.log('Uploaded file:', result.Key);
        return result.Location;
    });
}
