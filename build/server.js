"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const todos_1 = __importDefault(require("./routes/todos"));
const seed_1 = __importDefault(require("./routes/seed"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const middleware_1 = require("./utils/middleware");
logger_1.default.info('Connecting to MONGODB', config_1.default.MONGODB_URI);
mongoose_1.default.connect(config_1.default.MONGODB_URI)
    .then(() => {
    logger_1.default.info('Connected to MongoDB');
})
    .catch(error => {
    logger_1.default.info('Unable to connect to MongoDB', error.message);
});
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
server.get('/hello', (_req, res) => {
    res.send(`Hello, World! ${config_1.default.SECRET}`);
});
server.use('/api', middleware_1.requestLogger);
server.use('/api/users', users_1.default);
server.use('/api/todos', middleware_1.userExtractor, todos_1.default);
// --> has POST route to reset test db
if (config_1.default.ENV === 'dev') {
    server.use('/api/seed', seed_1.default);
}
exports.default = server;
