"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = __importDefault(require("./server"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = config_1.default.PORT;
server_1.default.listen(PORT, () => {
    // eslint-disable-next-line no-console
    logger_1.default.info('Listening on port', PORT);
});
