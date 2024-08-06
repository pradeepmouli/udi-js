import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "X10";
export class X10Node extends ISYDeviceNode {
    commands = {
        DON: this.on,
        DOF: this.off,
        BRT: this.brighten,
        DIM: this.dim,
        QUERY: this.query
    };
    drivers = {};
    static nodeDefId = "X10";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on() {
        return this.sendCommand("DON");
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async brighten() {
        return this.sendCommand("BRT");
    }
    async dim() {
        return this.sendCommand("DIM");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
