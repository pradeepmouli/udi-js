/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "SirenAlert";
export class SirenAlertNode extends Base {
    commands = {};
    static nodeDefId = "SirenAlert";
    static implements = ["SirenAlert"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(SirenAlertNode);
NodeFactory.register(SirenAlertNode, "SirenArm");
export var SirenAlert;
(function (SirenAlert) {
    function is(node) {
        return ["SirenAlert", "SirenArm"].includes(node.nodeDefId);
    }
    SirenAlert.is = is;
    function isImplementedBy(node) {
        return ["SirenAlert", "X10", "Thermostat", "TempLinc", "OnOffControl", "OnOffControl_ADV", "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "DimmerSwitchOnly", "DimmerSwitchOnly_ADV", "DimmerLampOnly", "KeypadDimmer", "KeypadDimmer_ADV", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly", "RelaySwitchOnly_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV", "RemoteLinc2", "RemoteLinc2_ADV", "IRLincTx", "FanLincMotor", "KeypadButton", "KeypadButton_ADV", "EZRAIN_Output", "EZRAIN_Input", "EZRAIN_Input_ADV", "EZIO2x4_Output", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "IMETER_SOLO", "DoorLock", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl", "BinaryControl_ADV", "AlertModuleSiren", "AlertModuleSiren_ADV", "AlertModuleArmed", "Siren", "Siren_ADV", "SirenArm", "PIR2844_ADV", "PIR2844C_ADV", "PIR2844OnOff_ADV"].includes(node.nodeDefId);
    }
    SirenAlert.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new SirenAlertNode(isy, nodeInfo);
    }
    SirenAlert.create = create;
    SirenAlert.Node = SirenAlertNode;
})(SirenAlert || (SirenAlert = {}));
//# sourceMappingURL=SirenAlert.js.map