/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "RelaySwitchOnly";
export class RelaySwitchNode extends Base {
    commands = {
        BEEP: this.beep,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "RelaySwitchOnly";
    static implements = ["RelaySwitchOnly", "IRLincTx", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async beep(value) { return this.sendCommand("BEEP", { value: value }); }
    async backlight(value) { return this.sendCommand("BL", { value: value }); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(RelaySwitchNode);
NodeFactory.register(RelaySwitchNode, "RelaySwitchOnly_ADV");
export var RelaySwitch;
(function (RelaySwitch) {
    function is(node) { return ["RelaySwitchOnly", "RelaySwitchOnly_ADV"].includes(node.nodeDefId); }
    RelaySwitch.is = is;
    function isImplementedBy(node) {
        return ["RelaySwitchOnly", "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly_ADV"].includes(node.nodeDefId);
    }
    RelaySwitch.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new RelaySwitchNode(isy, nodeInfo);
    }
    RelaySwitch.create = create;
    RelaySwitch.Node = RelaySwitchNode;
})(RelaySwitch || (RelaySwitch = {}));
//# sourceMappingURL=RelaySwitch.js.map