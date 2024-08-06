"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDimmableDevice = void 0;
const ISYDevice_js_1 = require("../ISYDevice.js");
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
const UOM_js_1 = require("../../Definitions/Global/UOM.js");
//@ts-ignore
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
    async initialize(endpoint) {
        try {
            await super.initialize(endpoint);
            const that = this;
            endpoint.events.levelControl.onLevel$Changed.on((value) => that.updateLevel(that.convertFrom(value, UOM_js_1.UnitOfMeasure.LevelFrom0To255)));
            endpoint.set({ levelControl: { onLevel: this.convertTo(this.level, UOM_js_1.UnitOfMeasure.LevelFrom0To255) } });
            this.on("PropertyChanged", (p, n, o, f) => endpoint.set({ levelControl: { onLevel: that.convertTo(Number(n), UOM_js_1.UnitOfMeasure.LevelFrom0To255) } }));
            //endpoint.events.levelCont
            endpoint.events.levelControl.maxLevel$Changed.on((value) => that.sendCommand("OL", value));
        }
        catch (error) {
        }
    }
}
exports.InsteonDimmableDevice = InsteonDimmableDevice;
