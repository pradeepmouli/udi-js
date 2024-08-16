import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { UDI } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "EM3TempSensor";
type Commands = {};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Degree;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: UDI.Error;
    };
};
export class TempSensorNode extends ISYDeviceNode<Family.UDI, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {};
    public drivers: Drivers = {};
    static nodeDefId = "EM3TempSensor";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    public get temperature(): number {
        return this.drivers.ST?.value;
    }
    public get responding(): UDI.Error {
        return this.drivers.ERR?.value;
    }
}
