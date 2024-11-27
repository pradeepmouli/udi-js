/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "IRLincTx";
export class IrLincTxNode extends Base {
    commands = {
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "IRLincTx";
    static implements = ["IRLincTx", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async beep(value) { return this.sendCommand("BEEP", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(IrLincTxNode);
export var IrLincTx;
(function (IrLincTx) {
    function is(node) {
        return ["IRLincTx"].includes(node.nodeDefId);
    }
    IrLincTx.is = is;
    function isImplementedBy(node) {
        return ["IRLincTx", "Thermostat", "TempLinc", "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "DimmerLampOnly", "KeypadDimmer", "KeypadDimmer_ADV", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly", "RelaySwitchOnly_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV"].includes(node.nodeDefId);
    }
    IrLincTx.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new IrLincTxNode(isy, nodeInfo);
    }
    IrLincTx.create = create;
    IrLincTx.Node = IrLincTxNode;
})(IrLincTx || (IrLincTx = {}));
//# sourceMappingURL=IrLincTx.js.map