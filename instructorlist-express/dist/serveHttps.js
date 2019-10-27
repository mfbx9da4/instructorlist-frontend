"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const https_1 = __importDefault(require("https"));
function getCredentials() {
    const privateKey = fs_1.readFileSync('sslcert/server.key', 'utf8');
    const certificate = fs_1.readFileSync('sslcert/server.crt', 'utf8');
    var credentials = { key: privateKey, cert: certificate };
    return credentials;
}
function serveHttps(app) {
    if (process.env.NODE_ENV !== 'production') {
        const httpsServer = https_1.default.createServer(getCredentials(), app);
        httpsServer.listen(443, () => console.log(`🐎 https://localhost`));
    }
}
exports.serveHttps = serveHttps;
