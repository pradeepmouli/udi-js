import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "X10";
type Commands = {
    DON: () => Promise<boolean>;
    DOF: () => Promise<boolean>;
    BRT: () => Promise<boolean>;
    DIM: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelRelay;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export class X10Node extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        DON: this.on,
        DOF: this.off,
        BRT: this.brighten,
        DIM: this.dim,
        QUERY: this.query
    };
    public drivers: Drivers = {};
    static nodeDefId = "X10";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on() {
        return this.sendCommand("DON");
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async brighten() {
        return this.sendCommand("BRT");
    }
    async dim() {
        return this.sendCommand("DIM");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    public get status(): OnLevelRelay {
        return this.drivers.ST?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
