/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class DimmerSwitchNode extends Base {
    commands = {
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "DimmerSwitchOnly";
    static implements = ['DimmerSwitchOnly', "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async backlight(value) { return this.sendCommand("BL", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(DimmerSwitchNode);
NodeFactory.register(DimmerSwitchNode, "DimmerSwitchOnly_ADV");
export var DimmerSwitch;
(function (DimmerSwitch) {
    function is(node) {
        return ['DimmerSwitchOnly', "DimmerSwitchOnly_ADV"].includes(node.nodeDefId);
    }
    DimmerSwitch.is = is;
    function isImplementedBy(node) {
        return ['DimmerSwitchOnly', "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "DimmerSwitchOnly_ADV"].includes(node.nodeDefId);
    }
    DimmerSwitch.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new DimmerSwitchNode(isy, nodeInfo);
    }
    DimmerSwitch.create = create;
    DimmerSwitch.Node = DimmerSwitchNode;
    DimmerSwitch.Class = DimmerSwitchNode;
    let Commands;
    (function (Commands) {
        Commands["backlight"] = "BL";
        Commands["writeChanges"] = "WDU";
    })(Commands = DimmerSwitch.Commands || (DimmerSwitch.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["responding"] = "ERR";
    })(Drivers = DimmerSwitch.Drivers || (DimmerSwitch.Drivers = {}));
})(DimmerSwitch || (DimmerSwitch = {}));
//# sourceMappingURL=DimmerSwitch.js.map