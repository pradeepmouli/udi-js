import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "DimmerSwitchOnly_ADV";
export class DimmerSwitchOnlyAdvNode extends ISYDeviceNode {
    commands = {
        BL: this.backlight,
        WDU: this.writeChanges
    };
    drivers = {};
    static nodeDefId = "DimmerSwitchOnly_ADV";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async backlight(value) {
        return this.sendCommand("BL", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
