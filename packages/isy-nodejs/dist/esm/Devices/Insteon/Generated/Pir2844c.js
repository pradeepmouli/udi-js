/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class Pir2844cNode extends Base {
    commands = {
        CLITEMP: this.calibrateTemperature,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "PIR2844C";
    static implements = ['PIR2844C'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.CLITEMP = Driver.create("CLITEMP", this, nodeInfo.state['CLITEMP'], { uom: UnitOfMeasure.Celsius, label: "Temperature", name: "temperature" });
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
NodeFactory.register(Pir2844cNode);
NodeFactory.register(Pir2844cNode, "PIR2844C_ADV");
export var Pir2844c;
(function (Pir2844c) {
    function is(node) {
        return ['PIR2844C', "PIR2844C_ADV"].includes(node.nodeDefId);
    }
    Pir2844c.is = is;
    function isImplementedBy(node) {
        return ['PIR2844C', "PIR2844", "PIR2844_ADV", "PIR2844C_ADV"].includes(node.nodeDefId);
    }
    Pir2844c.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new Pir2844cNode(isy, nodeInfo);
    }
    Pir2844c.create = create;
    Pir2844c.Node = Pir2844cNode;
    Pir2844c.Class = Pir2844cNode;
    let Commands;
    (function (Commands) {
        Commands["calibrateTemperature"] = "CLITEMP";
        Commands["query"] = "QUERY";
        Commands["beep"] = "BEEP";
        Commands["writeChanges"] = "WDU";
    })(Commands = Pir2844c.Commands || (Pir2844c.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["temperature"] = "CLITEMP";
        Drivers["luminance"] = "LUMIN";
        Drivers["batteryLevel"] = "BATLVL";
        Drivers["batteryPowered"] = "GV1";
        Drivers["responding"] = "ERR";
    })(Drivers = Pir2844c.Drivers || (Pir2844c.Drivers = {}));
})(Pir2844c || (Pir2844c = {}));
//# sourceMappingURL=Pir2844c.js.map