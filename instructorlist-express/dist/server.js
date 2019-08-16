"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serve_static_1 = __importDefault(require("serve-static"));
const express_1 = __importDefault(require("express"));
const preact_1 = require("preact");
const path_1 = require("path");
const fs_1 = require("fs");
const compression_1 = __importDefault(require("compression"));
const preact_render_to_string_1 = require("preact-render-to-string");
// @ts-ignore
const ssr_bundle_1 = __importDefault(require("../../instructorlist-preact/build/ssr-build/ssr-bundle"));
var http = require('http');
var https = require('https');
function getCredentials() {
    const privateKey = fs_1.readFileSync('sslcert/server.key', 'utf8');
    const certificate = fs_1.readFileSync('sslcert/server.crt', 'utf8');
    var credentials = { key: privateKey, cert: certificate };
    return credentials;
}
const compression = compression_1.default();
const BUILD_LOCATION = `../instructorlist-preact/build`;
const { PORT = 3000 } = process.env;
const RGX = /<div id="app"[^>]*>.*?(?=<script id="end-amp-content")/i;
const home = fs_1.readFileSync(`${BUILD_LOCATION}/index.html`, 'utf8');
const profile = fs_1.readFileSync(`${BUILD_LOCATION}/profile/index.html`, 'utf8');
function setHeaders(res, file) {
    let cache = path_1.basename(file) === 'service-worker.js'
        ? 'private,no-cache'
        : 'public,max-age=31536000,immutable';
    return res.setHeader('Cache-Control', cache); // don't cache service worker file
}
const ssr = (template) => (req, res) => {
    let body = preact_render_to_string_1.render(preact_1.h(ssr_bundle_1.default, { url: req.url }));
    body += '<div>Using SSR AMP</div>';
    res.setHeader('Content-Type', 'text/html');
    const out = template.replace(RGX, body);
    console.log('ssr', req.url, out.indexOf('src="/bundle.'));
    res.end(out);
};
const app = express_1.default()
    .use(compression)
    .get('/shell.html', (req, res) => {
    console.log('shell.html', home.indexOf('src="/bundle.'));
    res.setHeader('Content-Type', 'text/html');
    res.end(home);
})
    .get('/', ssr(home))
    .get('/profile/', ssr(profile))
    .get('/profile/:user', ssr(profile))
    .use(serve_static_1.default(BUILD_LOCATION, { setHeaders }))
    .get('*', (req, res) => {
    console.log('ERROR: should_not_be_here', req.url);
    res.setHeader('Content-Type', 'text/html');
    res.end(home);
});
app.set('trust proxy', true);
var httpServer = http.createServer(app);
httpServer.listen(PORT, () => console.log(`🎠 http://localhost:${PORT}`));
if (process.env.NODE_ENV !== 'production') {
    var httpsServer = https.createServer(getCredentials(), app);
    httpsServer.listen(443, () => console.log(`🐎 https://localhost`));
}
