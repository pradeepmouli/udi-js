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
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Boolean, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) {
        return this.sendCommand("DON", { value: value });
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async fastOff() {
        return this.sendCommand("DFOF");
    }
    async fastOn() {
        return this.sendCommand("DFON");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async beep(value) {
        return this.sendCommand("BEEP", { value: value });
    }
    async backlight(value) {
        return this.sendCommand("BL", { value: value });
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
NodeFactory.register(KeypadRelayNode);
NodeFactory.register(KeypadRelayNode, "KeypadRelay_ADV");
export var KeypadRelay;
(function (KeypadRelay) {
    function is(node) {
        return node.nodeDefId in ["KeypadRelay", "KeypadRelay_ADV"];
    }
    KeypadRelay.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["KeypadRelay", "KeypadRelay_ADV"];
    }
    KeypadRelay.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new KeypadRelayNode(isy, nodeInfo);
    }
    KeypadRelay.create = create;
    KeypadRelay.Node = KeypadRelayNode;
})(KeypadRelay || (KeypadRelay = {}));
//# sourceMappingURL=KeypadRelay.js.map