"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
exports.timer = async (exec, print = false) => {
    const start = perf_hooks_1.performance.now();
    const res = await exec();
    const end = perf_hooks_1.performance.now();
    const took = end - start;
    const name = typeof print === 'string' ? print : exec.name;
    if (print)
        console.info(`Function "${name}" took ${took} milliseconds`);
    return { took, res };
};
exports.default = exports.timer;
