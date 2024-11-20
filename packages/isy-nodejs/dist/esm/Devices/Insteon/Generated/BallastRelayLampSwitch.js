/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "BallastRelayLampSwitch";
export class BallastRelayLampSwitchNode extends Base {
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
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
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
NodeFactory.register(BallastRelayLampSwitchNode);
NodeFactory.register(BallastRelayLampSwitchNode, "BallastRelayLampSwitch_ADV");
export var BallastRelayLampSwitch;
(function (BallastRelayLampSwitch) {
    function is(node) {
        return node.nodeDefId in ["BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV"];
    }
    BallastRelayLampSwitch.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV"];
    }
    BallastRelayLampSwitch.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new BallastRelayLampSwitchNode(isy, nodeInfo);
    }
    BallastRelayLampSwitch.create = create;
    BallastRelayLampSwitch.Node = BallastRelayLampSwitchNode;
})(BallastRelayLampSwitch || (BallastRelayLampSwitch = {}));
//# sourceMappingURL=BallastRelayLampSwitch.js.map