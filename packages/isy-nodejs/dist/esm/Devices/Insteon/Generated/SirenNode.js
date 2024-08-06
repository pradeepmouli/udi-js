import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "SirenAlert";
export class SirenNode extends ISYDeviceNode {
    commands = {};
    drivers = {};
    static nodeDefId = "SirenAlert";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
