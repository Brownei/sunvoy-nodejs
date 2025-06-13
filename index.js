"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const axios_1 = __importStar(require("axios"));
const helper_1 = require("./helper");
const fs_1 = __importDefault(require("fs"));
const world = "world";
function getRandomNonce() {
    const arrayBytes = new Uint8Array(32 / 2);
    crypto.getRandomValues(arrayBytes);
    return Array.from(arrayBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = new URLSearchParams();
        data.append("nonce", "9257b1e99a5f8c5af87b5bc105fb8cf0");
        data.append("username", "demo@example.org");
        data.append("password", "test");
        try {
            const response = yield axios_1.default.post("https://challenge.sunvoy.com/login", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true,
            });
            return response;
        }
        catch (error) {
            console.log(error);
            return "There is a Big error here";
        }
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, data: allUsers } = yield helper_1.axiosInstance.post("https://challenge.sunvoy.com/api/users");
        return {
            status,
            allUsers,
        };
    });
}
function getCurrentUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, data: currentUser } = yield helper_1.axiosInstance.post("https://api.challenge.sunvoy.com/api/settings");
        return {
            status,
            currentUser,
        };
    });
}
function main() {
    getAllUsers()
        .then((response) => response)
        .then(({ status, allUsers }) => {
        if (status === 200) {
            // Create a JSON Logic
            try {
                fs_1.default.writeFileSync("users.json", JSON.stringify(allUsers));
            }
            catch (error) {
                console.error(error);
                throw error;
            }
            console.log("Users.json written successfully");
        }
    })
        .catch((error) => {
        var _a, _b;
        if (error instanceof axios_1.AxiosError) {
            console.error("Error response and status are: ", (_a = error.response) === null || _a === void 0 ? void 0 : _a.data, (_b = error.response) === null || _b === void 0 ? void 0 : _b.status);
        }
        else {
            console.error("Error");
        }
    });
    getCurrentUser()
        .then((response) => response)
        .then(({ status, currentUser }) => {
        if (status == 200) {
            try {
                const jsonData = fs_1.default.readFileSync("users.json").toString();
                const user = JSON.parse(jsonData);
                user.push(currentUser);
                fs_1.default.writeFileSync("users.json", user);
            }
            catch (error) { }
        }
    })
        .catch((err) => {
        if (err instanceof axios_1.AxiosError) {
        }
        else {
        }
    });
}
main();
