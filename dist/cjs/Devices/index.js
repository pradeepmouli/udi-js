"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Devices = void 0;
const index_js_1 = require("./Insteon/index.js");
const ZWaveBaseDevice_js_1 = require("./ZWave/ZWaveBaseDevice.js");
exports.Devices = {
    Insteon: index_js_1.Insteon,
    ZWave: { Base: ZWaveBaseDevice_js_1.ZWaveBaseDevice },
    ZigBee: {},
};
exports.default = exports.Devices;
