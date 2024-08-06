import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
export await using nodeDefId = "EM3TempSensor";
await using logger = isy.logger;
export class TempSensorNode extends ISYNode {
    commands = {};
    drivers = {};
    static nodeDefId = "EM3TempSensor";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
        this.drivers.ERR = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    get temperature() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
