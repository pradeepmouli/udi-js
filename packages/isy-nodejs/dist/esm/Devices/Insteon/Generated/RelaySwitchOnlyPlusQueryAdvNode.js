import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "RelaySwitchOnlyPlusQuery_ADV";
export class RelaySwitchOnlyPlusQueryAdvNode extends ISYDeviceNode {
    commands = {
        QUERY: this.query,
        BEEP: this.beep,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    drivers = {};
    static nodeDefId = "RelaySwitchOnlyPlusQuery_ADV";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async beep(value) {
        return this.sendCommand("BEEP", { value: value });
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
