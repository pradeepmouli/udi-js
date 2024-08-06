import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "KeypadDimmer";
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
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    OL: (value: OnLevelPercent) => Promise<boolean>;
    RR: (value: number) => Promise<boolean>;
    BL: (value: Backlight) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelPercent;
    };
    OL?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelPercent;
    };
    RR?: {
        uom: UnitOfMeasure.Index;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export class KeypadDimmerNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
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
        QUERY: this.query,
        BEEP: this.beep,
        OL: this.updateOnLevel,
        RR: this.updateRampRate,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    public drivers: Drivers = {};
    static nodeDefId = "KeypadDimmer";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.OL = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "On Level", name: "onLevel" });
        this.drivers.RR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Ramp Rate", name: "rampRate" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value: number) {
        return this.sendCommand("DON", { value: value });
    }
    async off() {
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
    async query() {
        return this.sendCommand("QUERY");
    }
    async beep(value: number) {
        return this.sendCommand("BEEP", { value: value });
    }
    async updateOnLevel(value: OnLevelPercent) {
        return this.sendCommand("OL", { value: value });
    }
    async updateRampRate(value: number) {
        return this.sendCommand("RR", { value: value });
    }
    async backlight(value: Backlight) {
        return this.sendCommand("BL", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    public get status(): OnLevelPercent {
        return this.drivers.ST?.value;
    }
    public get onLevel(): OnLevelPercent {
        return this.drivers.OL?.value;
    }
    public get rampRate(): number {
        return this.drivers.RR?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
