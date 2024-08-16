import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export const nodeDefId = "InsteonDimmer";
export class InsteonDimmerNode extends ISYDeviceNode {
    commands = {
        DON: this.turnOn,
        DOF: this.turnOff,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        BRT: this.brighten,
        DIM: this.dim,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FDSTOP: this.fadeStop,
        BEEP: this.beep,
        QUERY: this.query,
        CLIMD: this.mode,
        CLIFS: this.fanMode,
        CLISPH: this.heatSetpoint,
        CLISPC: this.coolSetpoint,
        CLISPHD: this.heatSetpointShift,
        CLISPCD: this.coolSetpointShift
    };
    drivers = {};
    static nodeDefId = "InsteonDimmer";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
    }
    async turnOn(value) {
        return this.sendCommand("DON", { value: value });
    }
    async turnOff() {
        return this.sendCommand("DOF");
    }
    async fastOff() {
        return this.sendCommand("DFOF");
    }
    async fastOn() {
        return this.sendCommand("DFON");
    }
    async brighten() {
        return this.sendCommand("BRT");
    }
    async dim() {
        return this.sendCommand("DIM");
    }
    async fadeUp() {
        return this.sendCommand("FDUP");
    }
    async fadeDown() {
        return this.sendCommand("FDDOWN");
    }
    async fadeStop() {
        return this.sendCommand("FDSTOP");
    }
    async beep() {
        return this.sendCommand("BEEP");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async mode(value) {
        return this.sendCommand("CLIMD", { value: value });
    }
    async fanMode(value) {
        return this.sendCommand("CLIFS", { value: value });
    }
    async heatSetpoint(value) {
        return this.sendCommand("CLISPH", { value: value });
    }
    async coolSetpoint(value) {
        return this.sendCommand("CLISPC", { value: value });
    }
    async heatSetpointShift(value) {
        return this.sendCommand("CLISPHD", { value: value });
    }
    async coolSetpointShift(value) {
        return this.sendCommand("CLISPCD", { value: value });
    }
}
//# sourceMappingURL=InsteonDimmerNode.js.map