/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "PIR2844C";
export class Pir2844cNode extends Base {
    commands = {
        CLITEMP: this.calibrateTemperature,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "PIR2844C";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.CLITEMP = Driver.create("CLITEMP", this, nodeInfo.property, { uom: UnitOfMeasure.Celsius, label: "Temperature", name: "temperature" });
        this.drivers.LUMIN = Driver.create("LUMIN", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Luminance", name: "luminance" });
        this.drivers.BATLVL = Driver.create("BATLVL", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Battery Level", name: "batteryLevel" });
        this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.property, { uom: UnitOfMeasure.Boolean, label: "Battery Powered", name: "batteryPowered" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async calibrateTemperature(value) {
        return this.sendCommand("CLITEMP", { value: value });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async beep(value) {
        return this.sendCommand("BEEP", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get temperature() {
        return this.drivers.CLITEMP?.value;
    }
    get luminance() {
        return this.drivers.LUMIN?.value;
    }
    get batteryLevel() {
        return this.drivers.BATLVL?.value;
    }
    get batteryPowered() {
        return this.drivers.GV1?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(Pir2844cNode);
NodeFactory.register(Pir2844cNode, "PIR2844C_ADV");
export var Pir2844c;
(function (Pir2844c) {
    function is(node) {
        return node.nodeDefId in ["PIR2844C", "PIR2844C_ADV"];
    }
    Pir2844c.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["PIR2844C", "PIR2844C_ADV"];
    }
    Pir2844c.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new Pir2844cNode(isy, nodeInfo);
    }
    Pir2844c.create = create;
    Pir2844c.Node = Pir2844cNode;
})(Pir2844c || (Pir2844c = {}));
//# sourceMappingURL=Pir2844c.js.map