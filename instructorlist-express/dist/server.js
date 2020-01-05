"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
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
const getCriticalCssStyledComponents_1 = require("./getCriticalCssStyledComponents");
require("isomorphic-fetch"); // PolyFill Fetch for SSR
// @ts-ignore
const ssr_bundle_1 = __importDefault(require("../frontend-build-copy/ssr-build/ssr-bundle"));
const keepAlive_1 = require("./keepAlive");
const Version = 5;
const criticalCssStyledComponents = getCriticalCssStyledComponents_1.getCriticalCssStyledComponents();
const compression = compression_1.default();
const BUILD_LOCATION = path_1.default.resolve('./frontend-build-copy');
const { PORT = 8686 } = process.env;
const rgxAmpScripts = /<script id="start-amp-scripts"[^>]*>.*?(?=<script id="end-amp-scripts")/i;
const rgxHeaderStyle = /<style amp-custom><\/style>/i;
const rgxContent = /<div id="app"[^>]*>.*?(?=<script id="end-amp-content")/i;
const home = fs_1.readFileSync(`${BUILD_LOCATION}/index.html`, 'utf8');
const search = fs_1.readFileSync(`${BUILD_LOCATION}/search/index.html`, 'utf8');
const shell = fs_1.readFileSync(`${BUILD_LOCATION}/shell/index.html`, 'utf8');
console.log('InstructorListExpressVersion', Version);
function setHeaders(res, file) {
    console.log('build file served', file);
    let cache = path_2.basename(file) === 'sw.js' || path_2.basename(file) === 'sw-esm.js'
        ? 'private,no-cache,no-store,must-revalidate'
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
    let ssrData = {};
    const url = req.url;
    let matched = matchPage(url, ssr_bundle_1.default.pages);
    // Inject Data
    if (matched && matched.page.component.getInitialProps) {
        ssrData = await matched.page.component.getInitialProps(matched.match);
    }
    let body = await preact_render_to_string_1.render(preact_1.h(ssr_bundle_1.default, { url, ssrData }));
    res.setHeader('Content-Type', 'text/html');
    let out = template.replace(rgxContent, body);
    if (!isAmp) {
        out = out.replace(rgxAmpScripts, '');
    }
    out = out.replace(rgxHeaderStyle, `<style amp-custom ${criticalCssStyledComponents.substring(6)}`);
    console.log('is AMP', url, out.indexOf('src="/bundle.') === -1);
    res.end(out);
};
const app = express_1.default()
    .use(compression)
    .use((req, res, next) => {
    next();
})
    .get('/', ssr(home))
    .get('/search/', ssr(search))
    .get('/classes/', ssr(search))
    .get('/classes/:id', ssr(search))
    .get('/shell/index.html', ssr(shell, false))
    .use(serve_static_1.default(BUILD_LOCATION, { setHeaders }))
    .get('/:slug', ssr(search))
    .get('*', (req, res) => {
    console.log('ERROR: should_not_be_here', req.url);
    res.setHeader('Content-Type', 'text/html');
    res.end(ssr(home, false)(req, res));
});
app.set('trust proxy', true);
const httpServer = http_1.default.createServer(app);
httpServer.listen(PORT, () => console.log(`🎠 http://localhost:${PORT}`));
keepAlive_1.keepAlive();
