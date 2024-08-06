import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "TempLinc";
export class TempLincNode extends ISYDeviceNode {
    commands = {
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
    drivers = {};
    static nodeDefId = "TempLinc";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
        this.drivers.CLISPH = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Degree, label: "Heat Setpoint", name: "heatSetpoint" });
        this.drivers.CLISPC = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Degree, label: "Cool Setpoint", name: "coolSetpoint" });
        this.drivers.CLIMD = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.InsteonThermostatMode, label: "Mode", name: "mode" });
        this.drivers.CLIFS = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.InsteonThermostatFanMode, label: "Fan Mode", name: "fanMode" });
        this.drivers.CLIHUM = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Humidity", name: "humidity" });
        this.drivers.CLIHCS = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.ThermostatHeatCoolState, label: "Heat/Cool State", name: "heatCoolState" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async updateHeatSetpoint(value) {
        return this.sendCommand("CLISPH", { value: value });
    }
    async updateCoolSetpoint(value) {
        return this.sendCommand("CLISPC", { value: value });
    }
    async updateMode(value) {
        return this.sendCommand("CLIMD", { value: value });
    }
    async updateFanMode(value) {
        return this.sendCommand("CLIFS", { value: value });
    }
    async setpointUp() {
        return this.sendCommand("BRT");
    }
    async setpointDown() {
        return this.sendCommand("DIM");
    }
    async beep(value) {
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
    get temperature() {
        return this.drivers.ST?.value;
    }
    get heatSetpoint() {
        return this.drivers.CLISPH?.value;
    }
    get coolSetpoint() {
        return this.drivers.CLISPC?.value;
    }
    get mode() {
        return this.drivers.CLIMD?.value;
    }
    get fanMode() {
        return this.drivers.CLIFS?.value;
    }
    get humidity() {
        return this.drivers.CLIHUM?.value;
    }
    get heatCoolState() {
        return this.drivers.CLIHCS?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
