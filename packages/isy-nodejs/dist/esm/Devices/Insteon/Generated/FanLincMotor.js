/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "FanLincMotor";
class FanLincMotorNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "FanLincMotor";
    static implements = ['FanLincMotor'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", value); }
    async off() { return this.sendCommand("DOF"); }
    async fastOff() { return this.sendCommand("DFOF"); }
    async fastOn() { return this.sendCommand("DFON"); }
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
NodeFactory.register(FanLincMotorNode);
export var FanLincMotor;
(function (FanLincMotor) {
    function is(node) {
        return ['FanLincMotor'].includes(node.nodeDefId);
    }
    FanLincMotor.is = is;
    function isImplementedBy(node) {
        return ['FanLincMotor'].includes(node.nodeDefId);
    }
    FanLincMotor.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new FanLincMotorNode(isy, nodeInfo);
    }
    FanLincMotor.create = create;
    FanLincMotor.Node = FanLincMotorNode;
})(FanLincMotor || (FanLincMotor = {}));
//# sourceMappingURL=FanLincMotor.js.map