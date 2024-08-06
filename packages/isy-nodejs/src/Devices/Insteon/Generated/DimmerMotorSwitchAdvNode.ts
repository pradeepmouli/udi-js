import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "DimmerMotorSwitch_ADV";
type Commands = {
    DON: (value: number) => Promise<boolean>;
    DOF: () => Promise<boolean>;
    DFOF: () => Promise<boolean>;
    DFON: () => Promise<boolean>;
    FDUP: () => Promise<boolean>;
    FDDOWN: () => Promise<boolean>;
    FDSTOP: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    OL: (value: OnLevelPercent) => Promise<boolean>;
    DUR: (value: number) => Promise<boolean>;
    BL: (value: number) => Promise<boolean>;
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
    DUR?: {
        uom: UnitOfMeasure.DurationInSeconds;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export class DimmerMotorSwitchAdvNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FDSTOP: this.fadeStop,
        QUERY: this.query,
        BEEP: this.beep,
        OL: this.updateOnLevel,
        DUR: this.updateMaxDuration,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    public drivers: Drivers = {};
    static nodeDefId = "DimmerMotorSwitch_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.OL = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "On Level", name: "onLevel" });
        this.drivers.DUR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.DurationInSeconds, label: "Max Duration", name: "maxDuration" });
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
    async updateMaxDuration(value: number) {
        return this.sendCommand("DUR", { value: value });
    }
    async backlight(value: number) {
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
    public get maxDuration(): number {
        return this.drivers.DUR?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
