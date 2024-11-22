/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "KeypadRelay";
export class KeypadRelayNode extends Base {
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
    static nodeDefId = "KeypadRelay";
    static implements = ["KeypadRelay", "IRLincTx", "KeypadButton", "KeypadButton_ADV", "EZRAIN_Output", "EZIO2x4_Output", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "DoorLock", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl", "BinaryControl_ADV", "AlertModuleArmed", "SirenAlert", "SirenArm", "PIR2844OnOff", "PIR2844OnOff_ADV"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
NodeFactory.register(KeypadRelayNode);
NodeFactory.register(KeypadRelayNode, "KeypadRelay_ADV");
export var KeypadRelay;
(function (KeypadRelay) {
    function is(node) { return ["KeypadRelay", "KeypadRelay_ADV"].includes(node.nodeDefId); }
    KeypadRelay.is = is;
    function isImplementedBy(node) {
        return ["KeypadRelay", "KeypadRelay_ADV"].includes(node.nodeDefId);
    }
    KeypadRelay.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new KeypadRelayNode(isy, nodeInfo);
    }
    KeypadRelay.create = create;
    KeypadRelay.Node = KeypadRelayNode;
})(KeypadRelay || (KeypadRelay = {}));
//# sourceMappingURL=KeypadRelay.js.map