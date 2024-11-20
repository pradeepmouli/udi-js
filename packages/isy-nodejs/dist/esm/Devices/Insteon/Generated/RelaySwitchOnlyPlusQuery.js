/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "RelaySwitchOnlyPlusQuery";
export class RelaySwitchOnlyPlusQueryNode extends Base {
    commands = {
        QUERY: this.query,
        BEEP: this.beep,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "RelaySwitchOnlyPlusQuery";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(RelaySwitchOnlyPlusQueryNode);
NodeFactory.register(RelaySwitchOnlyPlusQueryNode, "RelaySwitchOnlyPlusQuery_ADV");
export var RelaySwitchOnlyPlusQuery;
(function (RelaySwitchOnlyPlusQuery) {
    function is(node) {
        return node.nodeDefId in ["RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV"];
    }
    RelaySwitchOnlyPlusQuery.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["RelaySwitchOnlyPlusQuery", "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelaySwitchOnlyPlusQuery_ADV"];
    }
    RelaySwitchOnlyPlusQuery.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new RelaySwitchOnlyPlusQueryNode(isy, nodeInfo);
    }
    RelaySwitchOnlyPlusQuery.create = create;
    RelaySwitchOnlyPlusQuery.Node = RelaySwitchOnlyPlusQueryNode;
})(RelaySwitchOnlyPlusQuery || (RelaySwitchOnlyPlusQuery = {}));
//# sourceMappingURL=RelaySwitchOnlyPlusQuery.js.map