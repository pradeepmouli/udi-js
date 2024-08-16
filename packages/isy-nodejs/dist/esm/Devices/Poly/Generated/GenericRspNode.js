import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "GENERIC";
export class GenericRspNode extends ISYDeviceNode {
    commands = {
        DON: this.on,
        DOF: this.off
    };
    drivers = {};
    static nodeDefId = "GENERIC";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.OffOn, label: "Status", name: "status" });
    }
    async on() {
        return this.sendCommand("DON");
    }
    async off() {
        return this.sendCommand("DOF");
    }
    get status() {
        return this.drivers.ST?.value;
    }
}
//# sourceMappingURL=GenericRspNode.js.map