"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDimmableDevice = void 0;
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
//@ts-ignore
class InsteonDimmableDevice extends InsteonRelayDevice_js_1.InsteonRelayDevice {
    constructor(isy, node) {
        super(isy, node);
        this.isDimmable = true;
    }
    // public async updateBrightnessLevel(level: number): Promise<{}> {
    // 	return super.(level);
    // }
    async initialize(endpoint) {
        try {
            await super.initialize(endpoint);
            const that = this;
            // endpoint.events.levelControl.onLevel$Changed.on((value) => that.updateLevel(that.convertFrom(value, UnitOfMeasure.LevelFrom0To255)));
            // endpoint.set({levelControl: {onLevel: this.convertTo(this.level,UnitOfMeasure.LevelFrom0To255)}});
            // this.on("PropertyChanged", (p,n,o,f) => endpoint.set({levelControl: {onLevel: that.convertTo(Number(n),UnitOfMeasure.LevelFrom0To255)}})
            // );
            // //endpoint.events.levelCont
            // endpoint.events.levelControl.maxLevel$Changed.on((value) => that.sendCommand("OL",value));
        }
        catch (error) {
        }
    }
}
exports.InsteonDimmableDevice = InsteonDimmableDevice;
//# sourceMappingURL=InsteonDimmableDevice.js.map