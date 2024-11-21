/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "RelayLampOnly";
export class RelayLampNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "RelayLampOnly";
    static implements = ["RelayLampOnly", "IRLincTx", "EZRAIN_Output", "EZIO2x4_Output", "AlertModuleArmed", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Boolean, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", { value: value }); }
    async off() { return this.sendCommand("DOF"); }
    async fastOff() { return this.sendCommand("DFOF"); }
    async fastOn() { return this.sendCommand("DFON"); }
    async query() { return this.sendCommand("QUERY"); }
    async beep(value) { return this.sendCommand("BEEP", { value: value }); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(RelayLampNode);
NodeFactory.register(RelayLampNode, "RelayLampOnly_ADV");
export var RelayLamp;
(function (RelayLamp) {
    function is(node) { return ["RelayLampOnly", "RelayLampOnly_ADV"].includes(node.nodeDefId); }
    RelayLamp.is = is;
    function isImplementedBy(node) {
        return ["RelayLampOnly", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelayLampOnly_ADV"].includes(node.nodeDefId);
    }
    RelayLamp.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new RelayLampNode(isy, nodeInfo);
    }
    RelayLamp.create = create;
    RelayLamp.Node = RelayLampNode;
})(RelayLamp || (RelayLamp = {}));
//# sourceMappingURL=RelayLamp.js.map