/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "BinaryControl";
export class BinaryControlNode extends Base {
    commands = {
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "BinaryControl";
    static implements = ["BinaryControl", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
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
NodeFactory.register(BinaryControlNode);
NodeFactory.register(BinaryControlNode, "BinaryControl_ADV");
export var BinaryControl;
(function (BinaryControl) {
    function is(node) { return ["BinaryControl", "BinaryControl_ADV"].includes(node.nodeDefId); }
    BinaryControl.is = is;
    function isImplementedBy(node) {
        return ["BinaryControl", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl_ADV"].includes(node.nodeDefId);
    }
    BinaryControl.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new BinaryControlNode(isy, nodeInfo);
    }
    BinaryControl.create = create;
    BinaryControl.Node = BinaryControlNode;
})(BinaryControl || (BinaryControl = {}));
//# sourceMappingURL=BinaryControl.js.map