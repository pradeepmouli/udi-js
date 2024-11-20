/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "CEILING_FAN";
export class CeilingFanNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        BRT: this.increaseSpeed,
        DIM: this.decreaseSpeed,
        INC_SPEED: this.increaseSpeed,
        DEC_SPEED: this.decreaseSpeed,
        SET_SPEED: this.setSpeed,
        SET_DIRECTION: this.setDirection
    };
    static nodeDefId = "CEILING_FAN";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Fan Speed (%)", name: "fanSpeed" });
        this.drivers.GV0 = Driver.create("GV0", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Fan Direction", name: "fanDirection" });
        this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.property, { uom: UnitOfMeasure.RawValue, label: "Fan Speed (#)", name: "fanSpeed" });
    }
    async on(value) {
        return this.sendCommand("DON", { value: value });
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async increaseSpeed() {
        return this.sendCommand("BRT");
    }
    async decreaseSpeed() {
        return this.sendCommand("DIM");
    }
    async increaseSpeed() {
        return this.sendCommand("INC_SPEED");
    }
    async decreaseSpeed() {
        return this.sendCommand("DEC_SPEED");
    }
    async setSpeed(fanSpeed) {
        return this.sendCommand("SET_SPEED", { FAN_SPEED: fanSpeed });
    }
    async setDirection(value) {
        return this.sendCommand("SET_DIRECTION", { value: value });
    }
    get fanSpeed() {
        return this.drivers.ST?.value;
    }
    get fanDirection() {
        return this.drivers.GV0?.value;
    }
    get fanSpeed() {
        return this.drivers.GV1?.value;
    }
}
NodeFactory.register(CeilingFanNode);
export var CeilingFan;
(function (CeilingFan) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    CeilingFan.is = is;
    function create(isy, nodeInfo) {
        return new CeilingFanNode(isy, nodeInfo);
    }
    CeilingFan.create = create;
    CeilingFan.Node = CeilingFanNode;
})(CeilingFan || (CeilingFan = {}));
