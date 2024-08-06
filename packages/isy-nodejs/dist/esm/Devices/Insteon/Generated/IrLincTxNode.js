import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export const nodeDefId = "IRLincTx";
export class IrLincTxNode extends ISYDeviceNode {
    commands = {
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    drivers = {};
    static nodeDefId = "IRLincTx";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async beep(value) {
        return this.sendCommand("BEEP", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
