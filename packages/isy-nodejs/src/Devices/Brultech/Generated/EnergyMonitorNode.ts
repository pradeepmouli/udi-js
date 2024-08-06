import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "BTChannel";
type Commands = {};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Watt;
        value: number;
    };
    TPW?: {
        uom: UnitOfMeasure.KilowattsPerHour;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export class EnergyMonitorNode extends ISYDeviceNode<Family.Brultech, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {};
    public drivers: Drivers = {};
    static nodeDefId = "BTChannel";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
        this.drivers.TPW = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    public get currentPower(): number {
        return this.drivers.ST?.value;
    }
    public get totalEnergy(): number {
        return this.drivers.TPW?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
