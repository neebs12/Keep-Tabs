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
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../models/users"));
const config_1 = __importDefault(require("../utils/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const SECRET = config_1.default.SECRET;
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this route fetches all the users from the users table
    const users = yield users_1.default.find({});
    res.json(users);
}));
// 1. Extract credentials & password from req.body
// 2. Config bcrypt (saltrounds)
// 3. Generate hash from password (bcrypt.hash)
// 4. Create new user in the database (Model.create)
// 5. Optionally return information to the requester
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Add validation of payload
    const { username, password: plaintextPassword } = req.body;
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(plaintextPassword, saltRounds);
    const newUser = yield users_1.default.create({
        username, passwordHash
    });
    res.status(201).json(newUser);
}));
// 1. Extract crendentials from the req.body - {username, password(plaintext)}
// 2. See if the user exists in the database given username via (UserModel.findOne)
// -- -- error if not (user not found)
// 3. Compare the pass(plaintext) with the existing hash via (bcrypt.compare)
// -- -- error if not (incorrect password)
// 4. Create a token via (jwt.sign, payload is username, can use timed tokens) 
// 5. Send back the token
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield users_1.default.findOne({ username });
    if (!user) { // is null
        res.status(404).json({ error: 'user not found' });
        return;
    }
    const result = yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!result) { // is false
        res.status(404).json({ error: 'incorrect password' });
        return;
    }
    // encrypted to front, ._id is transformed to .id
    const token = yield jsonwebtoken_1.default.sign({ username, id: user._id }, SECRET);
    res.json({ token });
}));
exports.default = router;
