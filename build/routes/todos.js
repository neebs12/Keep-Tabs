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
const todos_1 = __importDefault(require("../models/todos"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // here, we have access to the user's identity via req.users
    // -- given extracted users, use these credentials to attain
    // -- the associated todos
    const user = req.user;
    const todos = yield todos_1.default.find({ userId: user.id });
    res.json({ todos });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // here, we have access to the user's identity via req.users
    res.json({ message: `${req.method}: ${req.path} to be completed` });
}));
exports.default = router;
