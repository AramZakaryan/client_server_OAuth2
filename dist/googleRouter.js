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
exports.googleRouter = void 0;
const express_1 = require("express");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.googleRouter = (0, express_1.Router)();
exports.googleRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 4: Send to Authorization Server - Authorization Code, Client ID, Client Secret
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const code = req.query.code;
    if (!client_id || !client_secret) {
        return res.status(400).json({ error: "Missing client_id or client_secret" });
    }
    const body = new URLSearchParams({
        client_id,
        client_secret,
        code,
        redirect_uri: "http://localhost:5173/auth/google",
        grant_type: "authorization_code",
    });
    const tokenResponse = yield fetch("https://oauth2.googleapis.com/token", {
        method: 'POST',
        body,
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: 'application/x-www-form-urlencoded' },
    });
    // Step 5: Receive Access Token from Authorization Server
    const tokenData = yield tokenResponse.json();
    const accessToken = tokenData.access_token;
    // Step 6: Sending Access Token to Resource Server
    const userResponse = yield fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    // Step 7: Receive User data from Resource Server
    const user = yield userResponse.json();
    // Step 8: Send User data to Owner (client_app)
    res.json({ user: user });
    // res.json({tokenData});
}));
