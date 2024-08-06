import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export await using nodeDefId = "EM3Relay";
await using logger = isy.logger;
export class LampNode extends ISYNode {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query
    };
    drivers = {};
    static nodeDefId = "EM3Relay";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on() {
        this.sendCommand("DON");
    }
    async off() {
        this.sendCommand("DOF");
    }
    async query() {
        this.sendCommand("QUERY");
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
