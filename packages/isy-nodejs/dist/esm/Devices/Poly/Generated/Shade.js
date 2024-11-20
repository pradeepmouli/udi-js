/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "SHADE";
export class ShadeNode extends Base {
    commands = {
        DON: this.open,
        DOF: this.close
    };
    static nodeDefId = "SHADE";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.BarrierStatus, label: "Status", name: "status" });
    }
    async open() {
        return this.sendCommand("DON");
    }
    async close() {
        return this.sendCommand("DOF");
    }
    get status() {
        return this.drivers.ST?.value;
    }
}
NodeFactory.register(ShadeNode);
export var Shade;
(function (Shade) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    Shade.is = is;
    function create(isy, nodeInfo) {
        return new ShadeNode(isy, nodeInfo);
    }
    Shade.create = create;
    Shade.Node = ShadeNode;
})(Shade || (Shade = {}));
