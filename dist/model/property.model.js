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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const db_1 = __importDefault(require("../repo/db"));
class Property {
    getAll() {
        return __awaiter(this, arguments, void 0, function* (page = 1, size = 10) {
            const [properties, total] = yield Promise.all([
                db_1.default.property.findMany({
                    skip: (page - 1) * size,
                    take: size,
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                        rooms: true,
                        size: true,
                        imageUrl: true,
                    },
                }),
                db_1.default.property.count(),
            ]);
            return {
                data: properties,
                total,
                page,
                size,
            };
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const property = yield db_1.default.property.findUnique({
                where: { id },
                include: {
                    address: true,
                    developer: true,
                    project: true,
                },
            });
            return property;
        });
    }
    save(property) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address, developer, project } = property, propertyData = __rest(property, ["address", "developer", "project"]);
            const res = yield db_1.default.property.create({
                data: Object.assign(Object.assign({}, propertyData), { address: {
                        connectOrCreate: {
                            where: {
                                street_city_zip_country: {
                                    street: address.street,
                                    city: address.city,
                                    zip: address.zip,
                                    country: address.country,
                                },
                            },
                            create: {
                                street: address.street,
                                city: address.city,
                                zip: address.zip,
                                country: address.country,
                            },
                        },
                    }, developer: {
                        connectOrCreate: {
                            where: {
                                name: developer.name,
                            },
                            create: {
                                name: developer.name,
                                description: developer.description,
                            },
                        },
                    }, project: {
                        connectOrCreate: {
                            where: {
                                name: project.name,
                            },
                            create: {
                                name: project.name,
                            },
                        },
                    } }),
            });
            return res;
        });
    }
    searchProperties(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const properties = yield db_1.default.property.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            description: {
                                contains: query,
                                mode: 'insensitive',
                            },
                        },
                        {
                            address: {
                                street: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                        },
                        {
                            developer: {
                                name: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                        },
                        {
                            project: {
                                name: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    rooms: true,
                    size: true,
                    imageUrl: true,
                },
            });
            return properties;
        });
    }
}
exports.Property = Property;
