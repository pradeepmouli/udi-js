import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export await using nodeDefId = "EM3PulseCounter";
await using logger = isy.logger;
export class PulseCounterNode extends ISYNode {
    commands = {};
    drivers = {};
    static nodeDefId = "EM3PulseCounter";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.PulseCount, label: "Status", name: "status" });
        this.drivers.CPW = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
        this.drivers.TPW = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get currentPower() {
        return this.drivers.CPW?.value;
    }
    get totalEnergy() {
        return this.drivers.TPW?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
