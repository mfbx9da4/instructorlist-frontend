"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const oneMinute = 1000 * 60;
const isOutsidePeakHours = () => moment_timezone_1.default()
    .tz('Europe/London')
    .hour() < 12 ||
    moment_timezone_1.default()
        .tz('Europe/London')
        .hour() > 21;
function keepAlive() {
    return setInterval(() => {
        if (isOutsidePeakHours())
            return;
        console.log('KEEP_ALIVE');
        isomorphic_fetch_1.default('https://instructorlist-django.herokuapp.com/api/');
        isomorphic_fetch_1.default(`https://instructorlist-frontend.herokuapp.com/`);
        isomorphic_fetch_1.default(`https://brightpath.herokuapp.com/`);
    }, oneMinute * 2);
}
exports.keepAlive = keepAlive;
