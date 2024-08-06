import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "PIR2844_ADV";
type Commands = {
    CLITEMP: (value: number) => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelRelay;
    };
    CLITEMP?: {
        uom: UnitOfMeasure.Fahrenheit;
        value: number;
    };
    LUMIN?: {
        uom: UnitOfMeasure.Percent;
        value: number;
    };
    BATLVL?: {
        uom: UnitOfMeasure.Percent;
        value: number;
    };
    GV1?: {
        uom: UnitOfMeasure.Boolean;
        value: Boolean;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export class Pir2844AdvNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        CLITEMP: this.calibrateTemperature,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    public drivers: Drivers = {};
    static nodeDefId = "PIR2844_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.CLITEMP = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Fahrenheit, label: "Temperature", name: "temperature" });
        this.drivers.LUMIN = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Luminance", name: "luminance" });
        this.drivers.BATLVL = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Battery Level", name: "batteryLevel" });
        this.drivers.GV1 = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Battery Powered", name: "batteryPowered" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async calibrateTemperature(value: number) {
        return this.sendCommand("CLITEMP", { value: value });
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
    public get temperature(): number {
        return this.drivers.CLITEMP?.value;
    }
    public get luminance(): number {
        return this.drivers.LUMIN?.value;
    }
    public get batteryLevel(): number {
        return this.drivers.BATLVL?.value;
    }
    public get batteryPowered(): Boolean {
        return this.drivers.GV1?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
