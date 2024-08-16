import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "BRIDGE";
export class OutputNode extends ISYDeviceNode {
    commands = {
        UPDATE: this.forceUpdate
    };
    drivers = {};
    static nodeDefId = "BRIDGE";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Connected", name: "connected" });
    }
    async forceUpdate() {
        return this.sendCommand("UPDATE");
    }
    get connected() {
        return this.drivers.ST?.value;
    }
}
//# sourceMappingURL=OutputNode.js.map