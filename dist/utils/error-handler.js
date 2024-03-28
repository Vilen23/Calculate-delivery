"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (statusCode, message, res) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    console.log(error);
    res.status(statusCode).json({ error: message });
};
exports.errorHandler = errorHandler;
