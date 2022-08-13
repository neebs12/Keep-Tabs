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
exports.userExtractor = exports.requestLogger = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const users_1 = __importDefault(require("../models/users"));
const logger_1 = __importDefault(require("./logger"));
const requestLogger = (req, _res, next) => {
    logger_1.default.info('Method: ', req.method);
    logger_1.default.info('Path: ', req.path);
    logger_1.default.info('Body: ', req.body);
    logger_1.default.info('---');
    next();
};
exports.requestLogger = requestLogger;
const userExtractor = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Receives a req. 
    // This request contains a "authorization" header templated as "bearer <jwt>"
    // Thus, we need to extract the `jwt`. 
    // Then verify it to attain the jwt payload
    // -- if decodedToken.id is falsy, return next()
    // Fetch the user from the database via UserModel.findById (allowed by our token format)
    // Then assign this user in to req.user (.user field) field of the request object
    // -- if req.user is falsy in the following apis, then we will have to tell the front end that it does not work! - possibly re-navigate to login page
    const authHeaderVal = req.get('authorization');
    if (!authHeaderVal) {
        next();
        return;
    }
    const [_, encodedToken] = authHeaderVal.split(' ');
    const decodedToken = jsonwebtoken_1.default.verify(encodedToken, config_1.default.SECRET);
    if (typeof decodedToken === 'string' || !decodedToken.id) {
        next();
        return;
    }
    const id = decodedToken.id;
    const user = yield users_1.default.findById(id);
    if (!user) {
        next();
        return;
    }
    req.user = {
        username: user.username, id: user._id.toString()
    };
    next();
});
exports.userExtractor = userExtractor;
