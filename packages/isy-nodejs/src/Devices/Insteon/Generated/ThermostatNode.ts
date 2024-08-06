import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { DriverState } from "../../../Model/DriverState.js";
export const nodeDefId = "Thermostat";
type Commands = {
    CLISPH: (value: number) => Promise<boolean>;
    CLISPC: (value: number) => Promise<boolean>;
    CLIMD: (value: (0 | 1 | 2 | 3 | 5 | 6 | 7)) => Promise<boolean>;
    CLIFS: (value: (7 | 8)) => Promise<boolean>;
    BRT: () => Promise<boolean>;
    DIM: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    SETTIME: () => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Degree;
        value: number;
    };
    CLISPH?: {
        uom: UnitOfMeasure.Degree;
        value: number;
    };
    CLISPC?: {
        uom: UnitOfMeasure.Degree;
        value: number;
    };
    CLIMD?: {
        uom: UnitOfMeasure.InsteonThermostatMode;
        value: (0 | 1 | 2 | 3 | 5 | 6 | 7);
    };
    CLIFS?: {
        uom: UnitOfMeasure.InsteonThermostatFanMode;
        value: (7 | 8);
    };
    CLIHUM?: {
        uom: UnitOfMeasure.Percent;
        value: number;
    };
    CLIHCS?: {
        uom: UnitOfMeasure.ThermostatHeatCoolState;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export class ThermostatNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    public readonly commands: Commands = {
        CLISPH: this.updateHeatSetpoint,
        CLISPC: this.updateCoolSetpoint,
        CLIMD: this.updateMode,
        CLIFS: this.updateFanMode,
        BRT: this.setpointUp,
        DIM: this.setpointDown,
        BEEP: this.beep,
        QUERY: this.query,
        SETTIME: this.setTime,
        WDU: this.writeChanges
    };
    public drivers: Drivers = {};
    static nodeDefId = "Thermostat";
    constructor(isy: ISY, nodeInfo: NodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
        this.drivers.CLISPH = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Heat Setpoint", name: "heatSetpoint" });
        this.drivers.CLISPC = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Cool Setpoint", name: "coolSetpoint" });
        this.drivers.CLIMD = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.InsteonThermostatMode, label: "Mode", name: "mode" });
        this.drivers.CLIFS = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.InsteonThermostatFanMode, label: "Fan Mode", name: "fanMode" });
        this.drivers.CLIHUM = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Humidity", name: "humidity" });
        this.drivers.CLIHCS = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.ThermostatHeatCoolState, label: "Heat/Cool State", name: "heatCoolState" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async updateHeatSetpoint(value: number) {
        return this.sendCommand("CLISPH", { value: value });
    }
    async updateCoolSetpoint(value: number) {
        return this.sendCommand("CLISPC", { value: value });
    }
    async updateMode(value: (0 | 1 | 2 | 3 | 5 | 6 | 7)) {
        return this.sendCommand("CLIMD", { value: value });
    }
    async updateFanMode(value: (7 | 8)) {
        return this.sendCommand("CLIFS", { value: value });
    }
    async setpointUp() {
        return this.sendCommand("BRT");
    }
    async setpointDown() {
        return this.sendCommand("DIM");
    }
    async beep(value: number) {
        return this.sendCommand("BEEP", { value: value });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async setTime() {
        return this.sendCommand("SETTIME");
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    public get temperature(): number {
        return this.drivers.ST?.value;
    }
    public get heatSetpoint(): number {
        return this.drivers.CLISPH?.value;
    }
    public get coolSetpoint(): number {
        return this.drivers.CLISPC?.value;
    }
    public get mode(): (0 | 1 | 2 | 3 | 5 | 6 | 7) {
        return this.drivers.CLIMD?.value;
    }
    public get fanMode(): (7 | 8) {
        return this.drivers.CLIFS?.value;
    }
    public get humidity(): number {
        return this.drivers.CLIHUM?.value;
    }
    public get heatCoolState(): number {
        return this.drivers.CLIHCS?.value;
    }
    public get responding(): Error {
        return this.drivers.ERR?.value;
    }
}
