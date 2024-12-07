/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class Em3MainChannelNode extends Base {
    commands = {};
    static nodeDefId = "EM3MainChannel";
    static implements = ['EM3MainChannel'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.state['TPW'], { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.CV = Driver.create("CV", this, nodeInfo.state['CV'], { uom: UnitOfMeasure.Volt, label: "Current Voltage", name: "currentVoltage" });
        this.drivers.CC = Driver.create("CC", this, nodeInfo.state['CC'], { uom: UnitOfMeasure.Ampere, label: "Current Current", name: "currentCurrent" });
        this.drivers.PF = Driver.create("PF", this, nodeInfo.state['PF'], { uom: UnitOfMeasure.PowerFactor, label: "Power Factor", name: "powerFactor" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get totalEnergy() {
        return this.drivers.TPW?.value;
    }
    get currentVoltage() {
        return this.drivers.CV?.value;
    }
    get currentCurrent() {
        return this.drivers.CC?.value;
    }
    get powerFactor() {
        return this.drivers.PF?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(Em3MainChannelNode);
export var Em3MainChannel;
(function (Em3MainChannel) {
    function is(node) {
        return ['EM3MainChannel'].includes(node.nodeDefId);
    }
    Em3MainChannel.is = is;
    function isImplementedBy(node) {
        return ['EM3MainChannel'].includes(node.nodeDefId);
    }
    Em3MainChannel.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new Em3MainChannelNode(isy, nodeInfo);
    }
    Em3MainChannel.create = create;
    Em3MainChannel.Node = Em3MainChannelNode;
    Em3MainChannel.Class = Em3MainChannelNode;
    let Commands;
    (function (Commands) {
    })(Commands = Em3MainChannel.Commands || (Em3MainChannel.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["totalEnergy"] = "TPW";
        Drivers["currentVoltage"] = "CV";
        Drivers["currentCurrent"] = "CC";
        Drivers["powerFactor"] = "PF";
        Drivers["responding"] = "ERR";
    })(Drivers = Em3MainChannel.Drivers || (Em3MainChannel.Drivers = {}));
})(Em3MainChannel || (Em3MainChannel = {}));
//# sourceMappingURL=Em3MainChannel.js.map