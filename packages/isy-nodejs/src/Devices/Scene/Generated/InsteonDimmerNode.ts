import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js"
import { Driver } from "../../../Definitions/Global/Drivers.js";

import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "InsteonDimmer";
type Commands = {
    DON: (value: number) => Promise<boolean>;
    DOF: () => Promise<boolean>;
    DFOF: () => Promise<boolean>;
    DFON: () => Promise<boolean>;
    BRT: () => Promise<boolean>;
    DIM: () => Promise<boolean>;
    FDUP: () => Promise<boolean>;
    FDDOWN: () => Promise<boolean>;
    FDSTOP: () => Promise<boolean>;
    BEEP: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    CLIMD: (value: number) => Promise<boolean>;
    CLIFS: (value: (0 | 1)) => Promise<boolean>;
    CLISPH: (value: number) => Promise<boolean>;
    CLISPC: (value: number) => Promise<boolean>;
    CLISPHD: (value: number) => Promise<boolean>;
    CLISPCD: (value: number) => Promise<boolean>;
};
type Drivers = {};
export class InsteonDimmerNode extends ISYDeviceNode<Family.Scene, Drivers, Commands> {
    public readonly commands: Commands = {
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
    public drivers: Drivers = {};
    static nodeDefId = "InsteonDimmer";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
    }
    async turnOn(value: number) {
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
    async mode(value: number) {
        return this.sendCommand("CLIMD", { value: value });
    }
    async fanMode(value: (0 | 1)) {
        return this.sendCommand("CLIFS", { value: value });
    }
    async heatSetpoint(value: number) {
        return this.sendCommand("CLISPH", { value: value });
    }
    async coolSetpoint(value: number) {
        return this.sendCommand("CLISPC", { value: value });
    }
    async heatSetpointShift(value: number) {
        return this.sendCommand("CLISPHD", { value: value });
    }
    async coolSetpointShift(value: number) {
        return this.sendCommand("CLISPCD", { value: value });
    }
}
