import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Definitions/PropertyStatus.js";
export await using nodeDefId = "EM3Relay";
await using logger: Logger = isy.logger;
type Commands = {
    DON: () => Promise<boolean>;
    DOF: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: (0 | 100);
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: (0 | 1);
    };
};
export class LampNode extends ISYNode<Family.UDI, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query
    };
    public drivers: Drivers = {};
    static nodeDefId = "EM3Relay";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on() {
        this.sendCommand("DON");
    }
    async off() {
        this.sendCommand("DOF");
    }
    async query() {
        this.sendCommand("QUERY");
    }
    public get status(): boolean {
        return this.drivers.ST?.value;
    }
    public get responding(): boolean {
        return this.drivers.ERR?.value;
    }
}
