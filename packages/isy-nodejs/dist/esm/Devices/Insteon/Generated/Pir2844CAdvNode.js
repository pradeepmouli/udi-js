import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "PIR2844C_ADV";
export class Pir2844cAdvNode extends ISYDeviceNode {
    commands = {
        CLITEMP: this.calibrateTemperature,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    drivers = {};
    static nodeDefId = "PIR2844C_ADV";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.CLITEMP = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Celsius, label: "Temperature", name: "temperature" });
        this.drivers.LUMIN = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Luminance", name: "luminance" });
        this.drivers.BATLVL = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Battery Level", name: "batteryLevel" });
        this.drivers.GV1 = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Boolean, label: "Battery Powered", name: "batteryPowered" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async calibrateTemperature(value) {
        return this.sendCommand("CLITEMP", { value: value });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async beep(value) {
        return this.sendCommand("BEEP", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get temperature() {
        return this.drivers.CLITEMP?.value;
    }
    get luminance() {
        return this.drivers.LUMIN?.value;
    }
    get batteryLevel() {
        return this.drivers.BATLVL?.value;
    }
    get batteryPowered() {
        return this.drivers.GV1?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
