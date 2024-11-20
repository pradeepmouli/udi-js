/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
import { Base } from '../index.js';
export const nodeDefId = "NODIM_LIGHT";
export class LightNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFON: this.fastOn,
        DFOF: this.fastOff
    };
    static nodeDefId = "NODIM_LIGHT";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.OffOn, label: "Light", name: "light" });
    }
    async on() {
        return this.sendCommand("DON");
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async fastOn() {
        return this.sendCommand("DFON");
    }
    async fastOff() {
        return this.sendCommand("DFOF");
    }
    get light() {
        return this.drivers.ST?.value;
    }
}
NodeFactory.register(LightNode);
export var Light;
(function (Light) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    Light.is = is;
    function create(isy, nodeInfo) {
        return new LightNode(isy, nodeInfo);
    }
    Light.create = create;
    Light.Node = LightNode;
})(Light || (Light = {}));
