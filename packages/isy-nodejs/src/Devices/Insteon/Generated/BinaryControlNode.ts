import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { Insteon } from '../../../Definitions/index.js';
export const nodeDefId = "BinaryControl";
type Commands = {
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: Insteon.OnLevelRelay;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export class BinaryControlNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    public drivers: Drivers = {};
    static nodeDefId = "BinaryControl";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async beep(value: number) {
        return this.sendCommand("BEEP", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    public get status(): OnLevelRelay {
        return this.drivers.ST?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
