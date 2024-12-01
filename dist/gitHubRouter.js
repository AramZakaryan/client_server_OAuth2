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
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitHubRouter = void 0;
const express_1 = require("express");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.gitHubRouter = (0, express_1.Router)();
exports.gitHubRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 4: Send to Authorization Server - Authorization Code, Client ID, Client Secret
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;
    const code = req.query.code;
    const tokenResponse = yield fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: JSON.stringify({ client_id, client_secret, code }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    // Step 5: Receive Access Token from Authorization Server
    const tokenData = yield tokenResponse.json();
    const accessToken = tokenData.access_token;
    // Step 6: Sending Access Token to Resource Server
    const userResponse = yield fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    // Step 7: Receive User data from Resource Server
    const user = yield userResponse.json();
    // Step 8: Send User data to Owner (client_app)
    res.json({ user: user });
}));
