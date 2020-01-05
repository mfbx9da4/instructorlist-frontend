"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const oneMinute = 1000 * 60;
const isOffPeak = (date = moment_timezone_1.default()) => date.tz('Europe/London').hour() < 12 || date.tz('Europe/London').hour() > 21;
function keepAlive() {
    return setInterval(() => {
        if (isOffPeak())
            return;
        console.log('KEEP_ALIVE');
        for (let i = 0; i < 10; i++) {
            isomorphic_fetch_1.default('https://instructorlist-django.herokuapp.com/api/');
            isomorphic_fetch_1.default(`https://instructorlist-frontend.herokuapp.com/`);
            isomorphic_fetch_1.default(`https://brightpath.herokuapp.com/`);
        }
    }, oneMinute * 2);
}
exports.keepAlive = keepAlive;
