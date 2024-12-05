/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "I3PaddleFlags";
class I3PaddleFlagsNode extends Base {
    commands = {
        GV0: this.updateMode,
        GV1: this.updateProgramLock,
        GV2: this.updateResumeDim,
        GV4: this.updateKeyBeep,
        GV5: this.updateDisableRf,
        GV6: this.updateButtonLock,
        GV7: this.updateErrorBlink,
        QUERY: this.query,
        WDU: this.writeChanges
    };
    static nodeDefId = "I3PaddleFlags";
    static implements = ['I3PaddleFlags'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Boolean, label: "Mode", name: "mode" });
        this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.state['GV1'], { uom: UnitOfMeasure.Boolean, label: "Program Lock", name: "programLock" });
        this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.state['GV2'], { uom: UnitOfMeasure.Boolean, label: "Resume Dim", name: "resumeDim" });
        this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.state['GV4'], { uom: UnitOfMeasure.Boolean, label: "Key Beep", name: "keyBeep" });
        this.drivers.GV5 = Driver.create("GV5", this, nodeInfo.state['GV5'], { uom: UnitOfMeasure.Boolean, label: "Disable RF", name: "disableRf" });
        this.drivers.GV6 = Driver.create("GV6", this, nodeInfo.state['GV6'], { uom: UnitOfMeasure.Boolean, label: "Button Lock", name: "buttonLock" });
        this.drivers.GV7 = Driver.create("GV7", this, nodeInfo.state['GV7'], { uom: UnitOfMeasure.Boolean, label: "Error Blink", name: "errorBlink" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async updateMode(value) { return this.sendCommand("GV0", value); }
    async updateProgramLock(value) { return this.sendCommand("GV1", value); }
    async updateResumeDim(value) { return this.sendCommand("GV2", value); }
    async updateKeyBeep(value) { return this.sendCommand("GV4", value); }
    async updateDisableRf(value) { return this.sendCommand("GV5", value); }
    async updateButtonLock(value) { return this.sendCommand("GV6", value); }
    async updateErrorBlink(value) { return this.sendCommand("GV7", value); }
    async query() { return this.sendCommand("QUERY"); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get mode() {
        return this.drivers.ST?.value;
    }
    get programLock() {
        return this.drivers.GV1?.value;
    }
    get resumeDim() {
        return this.drivers.GV2?.value;
    }
    get keyBeep() {
        return this.drivers.GV4?.value;
    }
    get disableRf() {
        return this.drivers.GV5?.value;
    }
    get buttonLock() {
        return this.drivers.GV6?.value;
    }
    get errorBlink() {
        return this.drivers.GV7?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(I3PaddleFlagsNode);
export var I3PaddleFlags;
(function (I3PaddleFlags) {
    function is(node) {
        return ['I3PaddleFlags'].includes(node.nodeDefId);
    }
    I3PaddleFlags.is = is;
    function isImplementedBy(node) {
        return ['I3PaddleFlags', "I3KeypadFlags"].includes(node.nodeDefId);
    }
    I3PaddleFlags.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new I3PaddleFlagsNode(isy, nodeInfo);
    }
    I3PaddleFlags.create = create;
    I3PaddleFlags.Node = I3PaddleFlagsNode;
})(I3PaddleFlags || (I3PaddleFlags = {}));
//# sourceMappingURL=I3PaddleFlags.js.map