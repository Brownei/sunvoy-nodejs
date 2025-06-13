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
const world = 'world';
function getRandomNonce() {
    const arrayBytes = new Uint8Array(32 / 2);
    crypto.getRandomValues(arrayBytes);
    return Array.from(arrayBytes, byte => byte.toString(16).padStart(2, '0')).join('');
}
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = {
            nonce: "d8633b9ba9c891338816136de817baf0",
            username: "demo@example.org",
            password: "test"
        };
        const response = yield fetch('https://challenge.sunvoy.com/login', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });
        return response;
    });
}
function main() {
    return __awaiter(this, arguments, void 0, function* (who = world) {
        const apiRes = yield login();
        console.log(apiRes);
        return `Hello ${who}! `;
    });
}
main();
