import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "NCDRelay";
type Commands = {
    DON: () => Promise<boolean>;
    DOF: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    ADRPST: (value: (0 | 1)) => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: (0 | 100);
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export class LampAndSwitchNode extends ISYDeviceNode<Family.NCD, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query,
        ADRPST: this.adr
    };
    public drivers: Drivers = {};
    static nodeDefId = "NCDRelay";
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
    async query() {
        return this.sendCommand("QUERY");
    }
    async adr(value: (0 | 1)) {
        return this.sendCommand("ADRPST", { value: value });
    }
    public get status(): (0 | 100) {
        return this.drivers.ST?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
