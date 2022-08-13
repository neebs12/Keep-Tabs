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
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const todos_1 = __importDefault(require("../models/todos"));
const seed_1 = __importDefault(require("../seed"));
const router = express_1.default.Router();
router.post('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Clear all entries from test-database
    // 2. Get the users from seed database the users (unhashed)
    // 3. Hash the passwords of the users from the database (hashed)
    // 4. Assign the todos to users 
    // 5. Insert the todos
    yield users_1.default.deleteMany({});
    yield todos_1.default.deleteMany({});
    const saltRounds = 10;
    const hashedPasswords = (yield Promise.allSettled(seed_1.default.seedUsers.map(u => {
        return bcrypt_1.default.hash(u.password, saltRounds);
    })))
        // this is for checking, typecasting, for .value extraction for TS
        // inspiration: https://stackoverflow.com/questions/63783735/type-error-on-response-of-promise-allsettled
        .filter(p => p.status === 'fulfilled')
        .map(p => p.value);
    if (hashedPasswords.length !== seed_1.default.seedUsers.length) {
        throw new Error('Unable to correctly plant all users, not all passwords has been hashed!');
    }
    const newUsers = seed_1.default.seedUsers.map((u, ind) => {
        return { username: u.username, passwordHash: hashedPasswords[ind] };
    });
    const DBusers = yield users_1.default.insertMany(newUsers);
    // based on the users, we can then assign new todos
    // note that these users will have new ._id property
    const ids = DBusers.map((u) => u._id.toString());
    const sendTodos = seed_1.default.seedTodos.map((s) => {
        return Object.assign(Object.assign({}, s), { userId: getRandAryElm(ids), completed: false });
    });
    const DBtodos = yield todos_1.default.insertMany(sendTodos);
    res.status(201).json({
        users: DBusers,
        todos: DBtodos
    });
}));
exports.default = router;
function getRandAryElm(arry) {
    return arry[Math.floor(Math.random() * arry.length)];
}
