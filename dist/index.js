"use strict";
// client_server_OAuth2/src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const gitHubRouter_1 = require("./gitHubRouter");
const googleRouter_1 = require("./googleRouter");
app.use((0, cors_1.default)());
(0, dotenv_1.config)();
const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.json('welcome to client_server');
});
app.use('/auth/github', gitHubRouter_1.gitHubRouter);
app.use('/auth/google', googleRouter_1.googleRouter);
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
