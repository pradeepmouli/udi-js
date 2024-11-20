/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "BinaryAlarm";
export class BinaryAlarmNode extends Base {
    commands = {
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "BinaryAlarm";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(BinaryAlarmNode);
NodeFactory.register(BinaryAlarmNode, "BinaryAlarm_ADV");
export var BinaryAlarm;
(function (BinaryAlarm) {
    function is(node) {
        return node.nodeDefId in ["BinaryAlarm", "BinaryAlarm_ADV"];
    }
    BinaryAlarm.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["BinaryAlarm", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "BinaryAlarm_ADV"];
    }
    BinaryAlarm.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new BinaryAlarmNode(isy, nodeInfo);
    }
    BinaryAlarm.create = create;
    BinaryAlarm.Node = BinaryAlarmNode;
})(BinaryAlarm || (BinaryAlarm = {}));
//# sourceMappingURL=BinaryAlarm.js.map