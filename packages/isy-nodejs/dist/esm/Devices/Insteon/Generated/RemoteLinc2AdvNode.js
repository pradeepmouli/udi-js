import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "RemoteLinc2_ADV";
export class RemoteLinc2AdvNode extends ISYDeviceNode {
    commands = {
        WDU: this.writeChanges
    };
    drivers = {};
    static nodeDefId = "RemoteLinc2_ADV";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
