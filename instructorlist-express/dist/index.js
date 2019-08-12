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
const ssr_bundle_1 = __importDefault(require("../../instructorlist-preact/build/ssr-build/ssr-bundle"));
const compression = compression_1.default();
const App = ssr_bundle_1.default.default;
const { PORT = 3000 } = process.env;
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;
const template = fs_1.readFileSync('../instructorlist-preact/build/index.html', 'utf8');
function setHeaders(res, file) {
    let cache = path_1.basename(file) === 'sw.js'
        ? 'private,no-cache'
        : 'public,max-age=31536000,immutable';
    return res.setHeader('Cache-Control', cache); // don't cache service worker file
}
express_1.default()
    .use(compression)
    .use(serve_static_1.default('../instructorlist-preact/build', { setHeaders }))
    .get('*', (req, res) => {
    let body = preact_render_to_string_1.render(preact_1.h(App, { url: req.url }));
    console.log('body', body);
    res.setHeader('Content-Type', 'text/html');
    res.end(template.replace(RGX, body));
})
    .listen(PORT, () => {
    console.log(`> Running on http://localhost:${PORT}`);
});
