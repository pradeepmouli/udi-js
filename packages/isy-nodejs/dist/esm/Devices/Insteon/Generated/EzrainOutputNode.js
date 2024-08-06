import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "EZRAIN_Output";
export class EzrainOutputNode extends ISYDeviceNode {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query,
        WDU: this.writeChanges,
        BEEP: this.beep
    };
    drivers = {};
    static nodeDefId = "EZRAIN_Output";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) {
        return this.sendCommand("DON", { value: value });
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    async beep(value) {
        return this.sendCommand("BEEP", { value: value });
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
