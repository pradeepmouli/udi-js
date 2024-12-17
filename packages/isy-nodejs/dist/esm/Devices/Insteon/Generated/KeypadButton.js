/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class KeypadButtonNode extends Base {
    commands = {
        QUERY: this.query,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "KeypadButton";
    static implements = ['KeypadButton', "EZIO2x4_Input", "EZIO2x4_Input_ADV", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async query() { return this.sendCommand("QUERY"); }
    async backlight(value) { return this.sendCommand("BL", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(KeypadButtonNode);
NodeFactory.register(KeypadButtonNode, "KeypadButton_ADV");
export var KeypadButton;
(function (KeypadButton) {
    function is(node) {
        return ['KeypadButton', "KeypadButton_ADV"].includes(node.nodeDefId);
    }
    KeypadButton.is = is;
    function isImplementedBy(node) {
        return ['KeypadButton', "KeypadRelay", "KeypadRelay_ADV", "KeypadButton_ADV"].includes(node.nodeDefId);
    }
    KeypadButton.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new KeypadButtonNode(isy, nodeInfo);
    }
    KeypadButton.create = create;
    KeypadButton.Node = KeypadButtonNode;
    KeypadButton.Class = KeypadButtonNode;
    let Commands;
    (function (Commands) {
        Commands["query"] = "QUERY";
        Commands["backlight"] = "BL";
        Commands["writeChanges"] = "WDU";
    })(Commands = KeypadButton.Commands || (KeypadButton.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = KeypadButton.Drivers || (KeypadButton.Drivers = {}));
})(KeypadButton || (KeypadButton = {}));
//# sourceMappingURL=KeypadButton.js.map