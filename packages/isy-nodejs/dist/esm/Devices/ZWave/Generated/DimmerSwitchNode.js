import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "ZY002_1";
export class DimmerSwitchNode extends ISYDeviceNode {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFON: this.fastOn,
        DFOF: this.fastOff,
        BRT: this.brighten,
        DIM: this.dim,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FADE: this.fade,
        FDSTOP: this.fadeStop,
        QUERY: this.query,
        CONFIG: this.setConfiguration,
        WDU: this.writeChanges
    };
    drivers = {};
    static nodeDefId = "ZY002_1";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value, fadeRate) {
        return this.sendCommand("DON", { value: value, RR: fadeRate });
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async fastOn() {
        return this.sendCommand("DFON");
    }
    async fastOff() {
        return this.sendCommand("DFOF");
    }
    async brighten() {
        return this.sendCommand("BRT");
    }
    async dim() {
        return this.sendCommand("DIM");
    }
    async fadeUp(startLevel, fadeRate) {
        return this.sendCommand("FDUP", { STARTLEVEL: startLevel, RR: fadeRate });
    }
    async fadeDown(startLevel, fadeRate) {
        return this.sendCommand("FDDOWN", { STARTLEVEL: startLevel, RR: fadeRate });
    }
    async fade(direction, startLevel, fadeRate, , dDirection, , dFadeRate) {
        return this.sendCommand("FADE", { DIR: direction, STARTLEVEL: startLevel, RR: fadeRate, DIR2: 2n, dDirection, STEP2: 2n, dFadeRate });
    }
    async fadeStop() {
        return this.sendCommand("FDSTOP");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async setConfiguration(parameterNumber, parameterValue) {
        return this.sendCommand("CONFIG", { NUM: parameterNumber, VAL: parameterValue });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
//# sourceMappingURL=DimmerSwitchNode.js.map