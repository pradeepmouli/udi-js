/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class DoorLockNode extends Base {
    commands = {
        DON: this.lock,
        DOF: this.unlock,
        WDU: this.writeChanges
    };
    static nodeDefId = "DoorLock";
    static implements = ['DoorLock', "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async lock() { return this.sendCommand("DON"); }
    async unlock() { return this.sendCommand("DOF"); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(DoorLockNode);
export var DoorLock;
(function (DoorLock) {
    function is(node) {
        return ['DoorLock'].includes(node.nodeDefId);
    }
    DoorLock.is = is;
    function isImplementedBy(node) {
        return ['DoorLock', "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "FanLincMotor"].includes(node.nodeDefId);
    }
    DoorLock.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new DoorLockNode(isy, nodeInfo);
    }
    DoorLock.create = create;
    DoorLock.Node = DoorLockNode;
    DoorLock.Class = DoorLockNode;
    let Commands;
    (function (Commands) {
        Commands["lock"] = "DON";
        Commands["unlock"] = "DOF";
        Commands["writeChanges"] = "WDU";
    })(Commands = DoorLock.Commands || (DoorLock.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = DoorLock.Drivers || (DoorLock.Drivers = {}));
})(DoorLock || (DoorLock = {}));
//# sourceMappingURL=DoorLock.js.map