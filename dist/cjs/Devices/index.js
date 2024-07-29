"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Devices = void 0;
const index_js_1 = __importDefault(require("./Insteon/index.js"));
const ZWaveBaseDevice_js_1 = require("./ZWave/ZWaveBaseDevice.js");
exports.Devices = {
    Insteon: index_js_1.default,
    ZWave: { Base: ZWaveBaseDevice_js_1.ZWaveBaseDevice },
    ZigBee: {},
};
exports.default = exports.Devices;
