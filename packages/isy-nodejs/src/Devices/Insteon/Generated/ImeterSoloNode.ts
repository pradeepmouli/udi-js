import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "IMETER_SOLO";
type Commands = {
    RESET: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
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
export class ImeterSoloNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        RESET: this.resetTotalEnergy,
        QUERY: this.query,
        WDU: this.writeChanges
    };
    public drivers: Drivers = {};
    static nodeDefId = "IMETER_SOLO";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
        this.drivers.TPW = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async resetTotalEnergy() {
        return this.sendCommand("RESET");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async writeChanges() {
        return this.sendCommand("WDU");
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
