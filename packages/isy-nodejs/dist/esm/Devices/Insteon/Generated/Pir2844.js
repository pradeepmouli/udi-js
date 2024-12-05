/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "PIR2844";
class Pir2844Node extends Base {
    commands = {
        CLITEMP: this.calibrateTemperature,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "PIR2844";
    static implements = ['PIR2844', "PIR2844C", "PIR2844C_ADV"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.CLITEMP = Driver.create("CLITEMP", this, nodeInfo.state['CLITEMP'], { uom: UnitOfMeasure.Fahrenheit, label: "Temperature", name: "temperature" });
        this.drivers.LUMIN = Driver.create("LUMIN", this, nodeInfo.state['LUMIN'], { uom: UnitOfMeasure.Percent, label: "Luminance", name: "luminance" });
        this.drivers.BATLVL = Driver.create("BATLVL", this, nodeInfo.state['BATLVL'], { uom: UnitOfMeasure.Percent, label: "Battery Level", name: "batteryLevel" });
        this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.state['GV1'], { uom: UnitOfMeasure.Boolean, label: "Battery Powered", name: "batteryPowered" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async calibrateTemperature(value) { return this.sendCommand("CLITEMP", value); }
    async query() { return this.sendCommand("QUERY"); }
    async beep(value) { return this.sendCommand("BEEP", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
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
NodeFactory.register(Pir2844Node);
NodeFactory.register(Pir2844Node, "PIR2844_ADV");
export var Pir2844;
(function (Pir2844) {
    function is(node) {
        return ['PIR2844', "PIR2844_ADV"].includes(node.nodeDefId);
    }
    Pir2844.is = is;
    function isImplementedBy(node) {
        return ['PIR2844', "PIR2844_ADV"].includes(node.nodeDefId);
    }
    Pir2844.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new Pir2844Node(isy, nodeInfo);
    }
    Pir2844.create = create;
    Pir2844.Node = Pir2844Node;
})(Pir2844 || (Pir2844 = {}));
//# sourceMappingURL=Pir2844.js.map