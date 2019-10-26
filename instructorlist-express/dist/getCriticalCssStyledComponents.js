"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const preact_1 = require("preact");
const preact_render_to_string_1 = require("preact-render-to-string");
var moduleAlias = require('module-alias');
moduleAlias.addAliases({
    react: 'preact/compat',
    'react-dom': 'preact/compat',
    'create-react-class': path_1.default.resolve(__dirname, './create-preact-class'),
});
// import { renderToString } from 'react-dom/server'
const styled_components_1 = require("styled-components");
// @ts-ignore
const ssr_bundle_1 = __importDefault(require("../frontend-build-copy/ssr-build/ssr-bundle"));
function getCriticalCssStyledComponents() {
    const sheet = new styled_components_1.ServerStyleSheet();
    try {
        const inner = preact_1.h(ssr_bundle_1.default, { url: '/', ssrData: {} });
        const html = preact_render_to_string_1.render(sheet.collectStyles(inner));
        const styleTags = sheet.getStyleTags();
        return styleTags;
    }
    catch (error) {
        // handle error
        console.error(error);
    }
    finally {
        sheet.seal();
    }
    return '';
}
exports.getCriticalCssStyledComponents = getCriticalCssStyledComponents;
