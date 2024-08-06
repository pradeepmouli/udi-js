import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Definitions/PropertyStatus.js";
export await using nodeDefId = "EM3MainChannel";
await using logger: Logger = isy.logger;
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
        value: (0 | 1);
    };
};
export class Em3MainChannelNode extends ISYNode<Family.UDI, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {};
    public drivers: Drivers = {};
    static nodeDefId = "EM3MainChannel";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
        this.drivers.TPW = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.CV = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Volt, label: "Current Voltage", name: "currentVoltage" });
        this.drivers.CC = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Ampere, label: "Current Current", name: "currentCurrent" });
        this.drivers.PF = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.PowerFactor, label: "Power Factor", name: "powerFactor" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
    public get responding(): boolean {
        return this.drivers.ERR?.value;
    }
}
