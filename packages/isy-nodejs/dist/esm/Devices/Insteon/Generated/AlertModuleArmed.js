/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class AlertModuleArmedNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "AlertModuleArmed";
    static implements = ['AlertModuleArmed', "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on() { return this.sendCommand("DON"); }
    async off() { return this.sendCommand("DOF"); }
    async query() { return this.sendCommand("QUERY"); }
    async beep(value) { return this.sendCommand("BEEP", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(AlertModuleArmedNode);
export var AlertModuleArmed;
(function (AlertModuleArmed) {
    function is(node) {
        return ['AlertModuleArmed'].includes(node.nodeDefId);
    }
    AlertModuleArmed.is = is;
    function isImplementedBy(node) {
        return ['AlertModuleArmed', "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV", "FanLincMotor", "EZRAIN_Output", "AlertModuleSiren", "AlertModuleSiren_ADV"].includes(node.nodeDefId);
    }
    AlertModuleArmed.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new AlertModuleArmedNode(isy, nodeInfo);
    }
    AlertModuleArmed.create = create;
    AlertModuleArmed.Node = AlertModuleArmedNode;
    AlertModuleArmed.Class = AlertModuleArmedNode;
    let Commands;
    (function (Commands) {
        Commands["on"] = "DON";
        Commands["off"] = "DOF";
        Commands["query"] = "QUERY";
        Commands["beep"] = "BEEP";
        Commands["writeChanges"] = "WDU";
    })(Commands = AlertModuleArmed.Commands || (AlertModuleArmed.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = AlertModuleArmed.Drivers || (AlertModuleArmed.Drivers = {}));
})(AlertModuleArmed || (AlertModuleArmed = {}));
//# sourceMappingURL=AlertModuleArmed.js.map