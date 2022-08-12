"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
// --> see union for Fields and NodeJS.ProcessEnv in order to still properly process a modified process.env object with dotenv package
const config = ({ MONGODB_URI, MONGODB_TEST_URI, PORT, SECRET, ENV }) => {
    if (ENV === 'dev') {
        MONGODB_URI = parseGeneric(MONGODB_TEST_URI, 'MONGODB_TEST_URI');
    }
    return {
        MONGODB_URI: parseGeneric(MONGODB_URI, 'MONGODB_URI'),
        PORT: parseGeneric(PORT, 'PORT'),
        SECRET: parseGeneric(SECRET, 'SECRET'),
        ENV: parseENV(ENV)
    };
};
const parseGeneric = (value, descr) => {
    if (!value || !isString(value)) {
        throw new Error(`Environment is missing/has invalid ${descr}`);
    }
    return value;
};
const parseENV = (value) => {
    if (value !== undefined && !isENV(value)) {
        throw new Error(`Environment is missing/has invalid ENV`);
    }
    return value;
};
const isENV = (value) => {
    // so, no longer undefined so can check against enum
    // so will check against ENVS which is a subset from a union with VALID_ENVS
    for (const val of Object.values(types_1.ENVS)) {
        if (val === value) {
            return true;
        }
    }
    return false;
};
const isString = (value) => {
    return typeof value === 'string';
};
exports.default = config(process.env);
