"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serve_static_1 = __importDefault(require("serve-static"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const preact_1 = require("preact");
const path_2 = require("path");
const fs_1 = require("fs");
const compression_1 = __importDefault(require("compression"));
const preact_render_to_string_1 = require("preact-render-to-string");
const preact_router_clone_1 = require("./preact-router-clone");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
// @ts-ignore
const ssr_bundle_1 = __importDefault(require("../frontend-build-copy/ssr-build/ssr-bundle"));
// Polyfill Fetch for SSR
require('isomorphic-fetch');
const compression = compression_1.default();
const BUILD_LOCATION = path_1.default.resolve('./frontend-build-copy');
const { PORT = 80 } = process.env;
const rgxAmpScripts = /<script id="start-amp-scripts"[^>]*>.*?(?=<script id="end-amp-scripts")/i;
const rgxContent = /<div id="app"[^>]*>.*?(?=<script id="end-amp-content")/i;
const home = fs_1.readFileSync(`${BUILD_LOCATION}/index.html`, 'utf8');
const profile = fs_1.readFileSync(`${BUILD_LOCATION}/profile/index.html`, 'utf8');
const search = fs_1.readFileSync(`${BUILD_LOCATION}/search/index.html`, 'utf8');
const shell = fs_1.readFileSync(`${BUILD_LOCATION}/shell/index.html`, 'utf8');
function getCredentials() {
    const privateKey = fs_1.readFileSync('sslcert/server.key', 'utf8');
    const certificate = fs_1.readFileSync('sslcert/server.crt', 'utf8');
    var credentials = { key: privateKey, cert: certificate };
    return credentials;
}
function setHeaders(res, file) {
    let cache = path_2.basename(file) === 'service-worker.js'
        ? 'private,no-cache,no-store,must-revalidate,proxy-revalidate'
        : 'public,max-age=31536000,immutable';
    return res.setHeader('Cache-Control', cache); // don't cache service worker file
}
function matchPage(url, pages) {
    for (let page of pages) {
        const { path, component } = page, rest = __rest(page, ["path", "component"]);
        const match = preact_router_clone_1.exec(url, page.path, rest);
        if (match) {
            return { match, page };
        }
    }
}
const ssr = (template, isAmp = true) => async (req, res) => {
    console.log('template, isAmp', isAmp, template);
    let ssrData = {};
    const url = req.url;
    let matched = matchPage(url, ssr_bundle_1.default.pages);
    if (matched) {
        let { match, page } = matched;
        if (page.component.getInitialProps) {
            ssrData = await page.component.getInitialProps(match);
            console.log('ssrData', ssrData);
        }
    }
    let body = preact_render_to_string_1.render(preact_1.h(ssr_bundle_1.default, { url, ssrData }));
    res.setHeader('Content-Type', 'text/html');
    console.log('template.indexOf', template.indexOf('src="/bundle.'));
    let out = template.replace(rgxContent, body);
    console.log('template.indexOf', out.indexOf('src="/bundle.'));
    if (!isAmp) {
        out.replace(rgxAmpScripts, '');
    }
    console.log('is AMP', url, out.indexOf('src="/bundle.'));
    res.end(out);
};
const app = express_1.default()
    .use(compression)
    .use((req, res, next) => {
    console.log('req.url', req.url);
    next();
})
    .get('/', ssr(home))
    .get('/search/', ssr(search))
    .get('/shell/index.html', ssr(shell, false))
    .get('/profile/', ssr(profile))
    .get('/profile/:user', ssr(profile))
    .use(serve_static_1.default(BUILD_LOCATION, { setHeaders }))
    .get('*', (req, res) => {
    console.log('ERROR: should_not_be_here', req.url);
    res.setHeader('Content-Type', 'text/html');
    res.end(ssr(home, false)(req, res));
});
app.set('trust proxy', true);
const httpServer = http_1.default.createServer(app);
httpServer.listen(PORT, () => console.log(`🎠 http://localhost:${PORT}`));
if (process.env.NODE_ENV !== 'production') {
    const httpsServer = https_1.default.createServer(getCredentials(), app);
    httpsServer.listen(443, () => console.log(`🐎 https://localhost`));
}
