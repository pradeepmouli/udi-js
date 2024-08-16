import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { UDI } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "EM3MainChannel";
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
    CV?: {
        uom: UnitOfMeasure.Volt;
        value: number;
    };
    CC?: {
        uom: UnitOfMeasure.Ampere;
        value: number;
    };
    PF?: {
        uom: UnitOfMeasure.PowerFactor;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: UDI.Error;
    };
};
export class Em3MainChannelNode extends ISYDeviceNode<Family.UDI, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {};
    public drivers: Drivers = {};
    static nodeDefId = "EM3MainChannel";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.CV = Driver.create("CV", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Volt, label: "Current Voltage", name: "currentVoltage" });
        this.drivers.CC = Driver.create("CC", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Ampere, label: "Current Current", name: "currentCurrent" });
        this.drivers.PF = Driver.create("PF", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.PowerFactor, label: "Power Factor", name: "powerFactor" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    public get status(): number {
        return this.drivers.ST?.value;
    }
    public get totalEnergy(): number {
        return this.drivers.TPW?.value;
    }
    public get currentVoltage(): number {
        return this.drivers.CV?.value;
    }
    public get currentCurrent(): number {
        return this.drivers.CC?.value;
    }
    public get powerFactor(): number {
        return this.drivers.PF?.value;
    }
    public get responding(): UDI.Error {
        return this.drivers.ERR?.value;
    }
}
