/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "RemoteLinc2";
class RemoteLinc2Node extends Base {
    commands = {
        WDU: this.writeChanges
    };
    static nodeDefId = "RemoteLinc2";
    static implements = ['RemoteLinc2', "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(RemoteLinc2Node);
NodeFactory.register(RemoteLinc2Node, "RemoteLinc2_ADV");
export var RemoteLinc2;
(function (RemoteLinc2) {
    function is(node) {
        return ['RemoteLinc2', "RemoteLinc2_ADV"].includes(node.nodeDefId);
    }
    RemoteLinc2.is = is;
    function isImplementedBy(node) {
        return ['RemoteLinc2', "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "KeypadDimmer", "KeypadDimmer_ADV", "RemoteLinc2_ADV"].includes(node.nodeDefId);
    }
    RemoteLinc2.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new RemoteLinc2Node(isy, nodeInfo);
    }
    RemoteLinc2.create = create;
    RemoteLinc2.Node = RemoteLinc2Node;
})(RemoteLinc2 || (RemoteLinc2 = {}));
//# sourceMappingURL=RemoteLinc2.js.map