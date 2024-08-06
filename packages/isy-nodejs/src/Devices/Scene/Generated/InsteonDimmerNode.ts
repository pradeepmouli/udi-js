import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Definitions/PropertyStatus.js";
export await using nodeDefId = "InsteonDimmer";
await using logger: Logger = isy.logger;
type Commands = {
    DON: (value) => Promise<boolean>;
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
    CLIMD: (value) => Promise<boolean>;
    CLIFS: (value) => Promise<boolean>;
    CLISPH: (value) => Promise<boolean>;
    CLISPC: (value) => Promise<boolean>;
    CLISPHD: (value) => Promise<boolean>;
    CLISPCD: (value) => Promise<boolean>;
};
type Drivers = {};
export class InsteonDimmerNode extends ISYNode<Family.Scene, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        DON: this.on,
        DOF: this.off,
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
    async on(value) {
        this.sendCommand("DON", { value: value });
    }
    async off() {
        this.sendCommand("DOF");
    }
    async fastOff() {
        this.sendCommand("DFOF");
    }
    async fastOn() {
        this.sendCommand("DFON");
    }
    async brighten() {
        this.sendCommand("BRT");
    }
    async dim() {
        this.sendCommand("DIM");
    }
    async fadeUp() {
        this.sendCommand("FDUP");
    }
    async fadeDown() {
        this.sendCommand("FDDOWN");
    }
    async fadeStop() {
        this.sendCommand("FDSTOP");
    }
    async beep() {
        this.sendCommand("BEEP");
    }
    async query() {
        this.sendCommand("QUERY");
    }
    async mode(value) {
        this.sendCommand("CLIMD", { value: value });
    }
    async fanMode(value) {
        this.sendCommand("CLIFS", { value: value });
    }
    async heatSetpoint(value) {
        this.sendCommand("CLISPH", { value: value });
    }
    async coolSetpoint(value) {
        this.sendCommand("CLISPC", { value: value });
    }
    async heatSetpointShift(value) {
        this.sendCommand("CLISPHD", { value: value });
    }
    async coolSetpointShift(value) {
        this.sendCommand("CLISPCD", { value: value });
    }
}
