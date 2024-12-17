/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class BallastRelayLampSwitchNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "BallastRelayLampSwitch";
    static implements = ['BallastRelayLampSwitch', "RelayLampOnly", "RelayLampOnly_ADV", "IRLincTx", "EZRAIN_Output", "EZIO2x4_Output", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl", "BinaryControl_ADV", "AlertModuleArmed", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", value); }
    async off() { return this.sendCommand("DOF"); }
    async fastOff() { return this.sendCommand("DFOF"); }
    async fastOn() { return this.sendCommand("DFON"); }
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
NodeFactory.register(BallastRelayLampSwitchNode);
NodeFactory.register(BallastRelayLampSwitchNode, "BallastRelayLampSwitch_ADV");
export var BallastRelayLampSwitch;
(function (BallastRelayLampSwitch) {
    function is(node) {
        return ['BallastRelayLampSwitch', "BallastRelayLampSwitch_ADV"].includes(node.nodeDefId);
    }
    BallastRelayLampSwitch.is = is;
    function isImplementedBy(node) {
        return ['BallastRelayLampSwitch', "BallastRelayLampSwitch_ADV"].includes(node.nodeDefId);
    }
    BallastRelayLampSwitch.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new BallastRelayLampSwitchNode(isy, nodeInfo);
    }
    BallastRelayLampSwitch.create = create;
    BallastRelayLampSwitch.Node = BallastRelayLampSwitchNode;
    BallastRelayLampSwitch.Class = BallastRelayLampSwitchNode;
    let Commands;
    (function (Commands) {
        Commands["on"] = "DON";
        Commands["off"] = "DOF";
        Commands["fastOff"] = "DFOF";
        Commands["fastOn"] = "DFON";
        Commands["query"] = "QUERY";
        Commands["beep"] = "BEEP";
        Commands["writeChanges"] = "WDU";
    })(Commands = BallastRelayLampSwitch.Commands || (BallastRelayLampSwitch.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = BallastRelayLampSwitch.Drivers || (BallastRelayLampSwitch.Drivers = {}));
})(BallastRelayLampSwitch || (BallastRelayLampSwitch = {}));
//# sourceMappingURL=BallastRelayLampSwitch.js.map