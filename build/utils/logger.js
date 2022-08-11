"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const info = (...msg) => {
    console.log('>', ...msg);
};
const error = (...msg) => {
    console.error('>', ...msg);
};
exports.default = {
    info, error
};
