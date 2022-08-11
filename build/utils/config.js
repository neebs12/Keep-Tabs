"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// --> see union for Fields and NodeJS.ProcessEnv in order to still properly process a modified process.env object with dotenv package
const config = ({ MONGODB_URI, PORT, PASSWORD }) => {
    return {
        MONGODB_URI: parseMONGODB_URI(MONGODB_URI),
        PORT: parsePORT(PORT),
        PASSWORD: parsePASSWORD(PASSWORD)
    };
};
const parseMONGODB_URI = (value) => {
    if (!value || !isString(value)) {
        throw new Error('Environment is missing/has invalid MONGODB_URI');
    }
    return value;
};
const parsePORT = (value) => {
    if (!value || !isNumber(value)) {
        throw new Error('Environment is missing/has invalid PORT');
    }
    return value;
};
const parsePASSWORD = (value) => {
    if (!value || !isString(value)) {
        throw new Error('Environment is missing/has invalid PASSWORD');
    }
    return value;
};
const isString = (value) => {
    return typeof value === 'string';
};
const isNumber = (value) => {
    return typeof value === 'number';
};
exports.default = config(process.env);
