/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "GENERIC";
export class GenericDeviceNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off
    };
    static nodeDefId = "GENERIC";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.OffOn, label: "Status", name: "status" });
    }
    async on() {
        return this.sendCommand("DON");
    }
    async off() {
        return this.sendCommand("DOF");
    }
    get status() {
        return this.drivers.ST?.value;
    }
}
NodeFactory.register(GenericDeviceNode);
export var GenericDevice;
(function (GenericDevice) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    GenericDevice.is = is;
    function create(isy, nodeInfo) {
        return new GenericDeviceNode(isy, nodeInfo);
    }
    GenericDevice.create = create;
    GenericDevice.Node = GenericDeviceNode;
})(GenericDevice || (GenericDevice = {}));
