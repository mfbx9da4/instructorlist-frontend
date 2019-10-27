"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
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
        fetch('https://instructorlist-django.herokuapp.com/api/');
        fetch(`https://instructorlist-frontend.herokuapp.com/`);
        fetch(`https://brightpath.herokuapp.com/`);
    }, oneMinute * 4);
}
exports.keepAlive = keepAlive;
