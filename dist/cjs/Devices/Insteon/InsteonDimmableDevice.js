"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDimmableDevice = void 0;
const ISYDevice_js_1 = require("../ISYDevice.js");
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
class InsteonDimmableDevice extends (0, ISYDevice_js_1.ISYUpdateableLevelDevice)(InsteonRelayDevice_js_1.InsteonRelayDevice) {
    constructor(isy, node) {
        super(isy, node);
        this.isDimmable = true;
    }
    get brightnessLevel() {
        return this.level;
    }
    async updateBrightnessLevel(level) {
        return super.updateLevel(level);
    }
    initialize(endpoint) {
        try {
            super.initialize(endpoint);
            endpoint.events.levelControl.onLevel$Changed.on((value) => this.updateLevel(value));
            this.on("PropertyChanged", (p, n, o, f) => endpoint.set({ levelControl: { onLevel: Number(n) } }));
            //endpoint.events.levelCont
            endpoint.events.levelControl.maxLevel$Changed.on((value) => this.sendCommand("OL", value));
        }
        catch (error) {
        }
    }
}
exports.InsteonDimmableDevice = InsteonDimmableDevice;
