"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../utils/config"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true }
});
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        // here, mutate the object
        // remove __v and stringinfy and remove old _id
        const _id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        returnedObject.id = _id;
        if (config_1.default.ENV !== 'dev') {
            delete returnedObject.passwordHash;
        }
    }
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
