/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "EZIO2x4_Input";
export class Ezio2x4InputNode extends Base {
    commands = {
        WDU: this.writeChanges
    };
    static nodeDefId = "EZIO2x4_Input";
    static implements = ["EZIO2x4_Input", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(Ezio2x4InputNode);
NodeFactory.register(Ezio2x4InputNode, "EZIO2x4_Input_ADV");
export var Ezio2x4Input;
(function (Ezio2x4Input) {
    function is(node) { return ["EZIO2x4_Input", "EZIO2x4_Input_ADV"].includes(node.nodeDefId); }
    Ezio2x4Input.is = is;
    function isImplementedBy(node) {
        return ["EZIO2x4_Input", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "KeypadButton", "KeypadButton_ADV", "EZRAIN_Input", "EZRAIN_Input_ADV", "EZIO2x4_Input_ADV"].includes(node.nodeDefId);
    }
    Ezio2x4Input.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new Ezio2x4InputNode(isy, nodeInfo);
    }
    Ezio2x4Input.create = create;
    Ezio2x4Input.Node = Ezio2x4InputNode;
})(Ezio2x4Input || (Ezio2x4Input = {}));
//# sourceMappingURL=Ezio2x4Input.js.map