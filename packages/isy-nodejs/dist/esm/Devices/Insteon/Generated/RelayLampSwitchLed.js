/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "RelayLampSwitchLED";
export class RelayLampSwitchLedNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        LED: this.led,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "RelayLampSwitchLED";
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
    async led(value) {
        return this.sendCommand("LED", { value: value });
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
NodeFactory.register(RelayLampSwitchLedNode);
NodeFactory.register(RelayLampSwitchLedNode, "RelayLampSwitchLED_ADV");
export var RelayLampSwitchLed;
(function (RelayLampSwitchLed) {
    function is(node) {
        return node.nodeDefId in ["RelayLampSwitchLED", "RelayLampSwitchLED_ADV"];
    }
    RelayLampSwitchLed.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["RelayLampSwitchLED", "RelayLampSwitchLED_ADV"];
    }
    RelayLampSwitchLed.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new RelayLampSwitchLedNode(isy, nodeInfo);
    }
    RelayLampSwitchLed.create = create;
    RelayLampSwitchLed.Node = RelayLampSwitchLedNode;
})(RelayLampSwitchLed || (RelayLampSwitchLed = {}));
//# sourceMappingURL=RelayLampSwitchLed.js.map