/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class RelayLampSwitchNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "RelayLampSwitch";
    static implements = ['RelayLampSwitch', "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly", "RelaySwitchOnly_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "IRLincTx", "EZRAIN_Output", "EZIO2x4_Output", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "DoorLock", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl", "BinaryControl_ADV", "AlertModuleArmed", "SirenAlert", "SirenArm", "PIR2844OnOff", "PIR2844OnOff_ADV"];
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
    async backlight(value) { return this.sendCommand("BL", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(RelayLampSwitchNode);
NodeFactory.register(RelayLampSwitchNode, "RelayLampSwitch_ADV");
export var RelayLampSwitch;
(function (RelayLampSwitch) {
    function is(node) {
        return ['RelayLampSwitch', "RelayLampSwitch_ADV"].includes(node.nodeDefId);
    }
    RelayLampSwitch.is = is;
    function isImplementedBy(node) {
        return ['RelayLampSwitch', "RelayLampSwitch_ADV"].includes(node.nodeDefId);
    }
    RelayLampSwitch.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new RelayLampSwitchNode(isy, nodeInfo);
    }
    RelayLampSwitch.create = create;
    RelayLampSwitch.Node = RelayLampSwitchNode;
    RelayLampSwitch.Class = RelayLampSwitchNode;
    let Commands;
    (function (Commands) {
        Commands["on"] = "DON";
        Commands["off"] = "DOF";
        Commands["fastOff"] = "DFOF";
        Commands["fastOn"] = "DFON";
        Commands["query"] = "QUERY";
        Commands["beep"] = "BEEP";
        Commands["backlight"] = "BL";
        Commands["writeChanges"] = "WDU";
    })(Commands = RelayLampSwitch.Commands || (RelayLampSwitch.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = RelayLampSwitch.Drivers || (RelayLampSwitch.Drivers = {}));
})(RelayLampSwitch || (RelayLampSwitch = {}));
//# sourceMappingURL=RelayLampSwitch.js.map