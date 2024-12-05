/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "EZIO2x4_Output";
class Ezio2x4OutputNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query,
        WDU: this.writeChanges
    };
    static nodeDefId = "EZIO2x4_Output";
    static implements = ['EZIO2x4_Output', "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", value); }
    async off() { return this.sendCommand("DOF"); }
    async query() { return this.sendCommand("QUERY"); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(Ezio2x4OutputNode);
export var Ezio2x4Output;
(function (Ezio2x4Output) {
    function is(node) {
        return ['EZIO2x4_Output'].includes(node.nodeDefId);
    }
    Ezio2x4Output.is = is;
    function isImplementedBy(node) {
        return ['EZIO2x4_Output', "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV", "FanLincMotor", "EZRAIN_Output"].includes(node.nodeDefId);
    }
    Ezio2x4Output.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new Ezio2x4OutputNode(isy, nodeInfo);
    }
    Ezio2x4Output.create = create;
    Ezio2x4Output.Node = Ezio2x4OutputNode;
})(Ezio2x4Output || (Ezio2x4Output = {}));
//# sourceMappingURL=Ezio2x4Output.js.map