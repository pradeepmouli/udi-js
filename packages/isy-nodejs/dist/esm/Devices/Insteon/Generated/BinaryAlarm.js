/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class BinaryAlarmNode extends Base {
    commands = {
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "BinaryAlarm";
    static implements = ['BinaryAlarm', "BinaryControl", "BinaryControl_ADV", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
NodeFactory.register(BinaryAlarmNode);
NodeFactory.register(BinaryAlarmNode, "BinaryAlarm_ADV");
export var BinaryAlarm;
(function (BinaryAlarm) {
    function is(node) {
        return ['BinaryAlarm', "BinaryAlarm_ADV"].includes(node.nodeDefId);
    }
    BinaryAlarm.is = is;
    function isImplementedBy(node) {
        return ['BinaryAlarm', "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "BinaryAlarm_ADV"].includes(node.nodeDefId);
    }
    BinaryAlarm.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new BinaryAlarmNode(isy, nodeInfo);
    }
    BinaryAlarm.create = create;
    BinaryAlarm.Node = BinaryAlarmNode;
    BinaryAlarm.Class = BinaryAlarmNode;
    let Commands;
    (function (Commands) {
        Commands["query"] = "QUERY";
        Commands["beep"] = "BEEP";
        Commands["writeChanges"] = "WDU";
    })(Commands = BinaryAlarm.Commands || (BinaryAlarm.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = BinaryAlarm.Drivers || (BinaryAlarm.Drivers = {}));
})(BinaryAlarm || (BinaryAlarm = {}));
//# sourceMappingURL=BinaryAlarm.js.map