"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
exports.axiosInstance = axios_1.default.create({
    withCredentials: true,
});
exports.axiosInstance.interceptors.request.use((config) => {
    const authToken = "430f04a0-ee02-4911-9b7b-b7f63cc076ff";
    config.headers["Cookie"] = `JSESSIONID=${authToken}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});
