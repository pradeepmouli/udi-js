import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "NODIM_LIGHT";
export class LampNode extends ISYDeviceNode {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFON: this.fastOn,
        DFOF: this.fastOff
    };
    drivers = {};
    static nodeDefId = "NODIM_LIGHT";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.OffOn, label: "Light", name: "light" });
    }
    async on() {
        return this.sendCommand("DON");
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async fastOn() {
        return this.sendCommand("DFON");
    }
    async fastOff() {
        return this.sendCommand("DFOF");
    }
    get light() {
        return this.drivers.ST?.value;
    }
}
//# sourceMappingURL=LampNode.js.map