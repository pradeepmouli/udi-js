/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class Pir2844OnOffNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "PIR2844OnOff";
    static implements = ['PIR2844OnOff'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", value); }
    async off() { return this.sendCommand("DOF"); }
    async query() { return this.sendCommand("QUERY"); }
    async beep(value) { return this.sendCommand("BEEP", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(Pir2844OnOffNode);
NodeFactory.register(Pir2844OnOffNode, "PIR2844OnOff_ADV");
export var Pir2844OnOff;
(function (Pir2844OnOff) {
    function is(node) {
        return ['PIR2844OnOff', "PIR2844OnOff_ADV"].includes(node.nodeDefId);
    }
    Pir2844OnOff.is = is;
    function isImplementedBy(node) {
        return ['PIR2844OnOff', "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "PIR2844OnOff_ADV"].includes(node.nodeDefId);
    }
    Pir2844OnOff.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new Pir2844OnOffNode(isy, nodeInfo);
    }
    Pir2844OnOff.create = create;
    Pir2844OnOff.Node = Pir2844OnOffNode;
    Pir2844OnOff.Class = Pir2844OnOffNode;
    let Commands;
    (function (Commands) {
        Commands["on"] = "DON";
        Commands["off"] = "DOF";
        Commands["query"] = "QUERY";
        Commands["beep"] = "BEEP";
        Commands["writeChanges"] = "WDU";
    })(Commands = Pir2844OnOff.Commands || (Pir2844OnOff.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = Pir2844OnOff.Drivers || (Pir2844OnOff.Drivers = {}));
})(Pir2844OnOff || (Pir2844OnOff = {}));
//# sourceMappingURL=Pir2844OnOff.js.map