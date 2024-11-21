/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "EZRAIN_Output";
export class EzrainOutputNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query,
        WDU: this.writeChanges,
        BEEP: this.beep
    };
    static nodeDefId = "EZRAIN_Output";
    static implements = ["EZRAIN_Output", "EZIO2x4_Output", "AlertModuleArmed", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", { value: value }); }
    async off() { return this.sendCommand("DOF"); }
    async query() { return this.sendCommand("QUERY"); }
    async writeChanges() { return this.sendCommand("WDU"); }
    async beep(value) { return this.sendCommand("BEEP", { value: value }); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(EzrainOutputNode);
export var EzrainOutput;
(function (EzrainOutput) {
    function is(node) { return ["EZRAIN_Output"].includes(node.nodeDefId); }
    EzrainOutput.is = is;
    function isImplementedBy(node) {
        return ["EZRAIN_Output", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV", "FanLincMotor"].includes(node.nodeDefId);
    }
    EzrainOutput.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new EzrainOutputNode(isy, nodeInfo);
    }
    EzrainOutput.create = create;
    EzrainOutput.Node = EzrainOutputNode;
})(EzrainOutput || (EzrainOutput = {}));
//# sourceMappingURL=EzrainOutput.js.map