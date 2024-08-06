import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "RelayLampOnly_ADV";
export class RelayLampOnlyAdvNode extends ISYDeviceNode {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    drivers = {};
    static nodeDefId = "RelayLampOnly_ADV";
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
    async fastOff() {
        return this.sendCommand("DFOF");
    }
    async fastOn() {
        return this.sendCommand("DFON");
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
    get responding() {
        return this.drivers.ERR?.value;
    }
}
