/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class I3KeypadFlagsNode extends Base {
    commands = {
        GV0: this.updateMode,
        GV1: this.updateProgramLock,
        GV2: this.updateResumeDim,
        GV3: this.updateRelayAtFullOn,
        GV4: this.updateKeyBeep,
        GV5: this.updateDisableRf,
        GV6: this.updateButtonLock,
        GV7: this.updateErrorBlink,
        GV8: this.updateCleanupReports,
        QUERY: this.query,
        WDU: this.writeChanges
    };
    static nodeDefId = "I3KeypadFlags";
    static implements = ['I3KeypadFlags'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Boolean, label: "Mode", name: "mode" });
        this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.state['GV1'], { uom: UnitOfMeasure.Boolean, label: "Program Lock", name: "programLock" });
        this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.state['GV2'], { uom: UnitOfMeasure.Boolean, label: "Resume Dim", name: "resumeDim" });
        this.drivers.GV3 = Driver.create("GV3", this, nodeInfo.state['GV3'], { uom: UnitOfMeasure.Boolean, label: "Relay at Full On", name: "relayAtFullOn" });
        this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.state['GV4'], { uom: UnitOfMeasure.Boolean, label: "Key Beep", name: "keyBeep" });
        this.drivers.GV5 = Driver.create("GV5", this, nodeInfo.state['GV5'], { uom: UnitOfMeasure.Boolean, label: "Disable RF", name: "disableRf" });
        this.drivers.GV6 = Driver.create("GV6", this, nodeInfo.state['GV6'], { uom: UnitOfMeasure.Boolean, label: "Button Lock", name: "buttonLock" });
        this.drivers.GV7 = Driver.create("GV7", this, nodeInfo.state['GV7'], { uom: UnitOfMeasure.Boolean, label: "Error Blink", name: "errorBlink" });
        this.drivers.GV8 = Driver.create("GV8", this, nodeInfo.state['GV8'], { uom: UnitOfMeasure.Boolean, label: "Cleanup Reports", name: "cleanupReports" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async updateMode(value) { return this.sendCommand("GV0", value); }
    async updateProgramLock(value) { return this.sendCommand("GV1", value); }
    async updateResumeDim(value) { return this.sendCommand("GV2", value); }
    async updateRelayAtFullOn(value) { return this.sendCommand("GV3", value); }
    async updateKeyBeep(value) { return this.sendCommand("GV4", value); }
    async updateDisableRf(value) { return this.sendCommand("GV5", value); }
    async updateButtonLock(value) { return this.sendCommand("GV6", value); }
    async updateErrorBlink(value) { return this.sendCommand("GV7", value); }
    async updateCleanupReports(value) { return this.sendCommand("GV8", value); }
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
    get relayAtFullOn() {
        return this.drivers.GV3?.value;
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
    get cleanupReports() {
        return this.drivers.GV8?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(I3KeypadFlagsNode);
export var I3KeypadFlags;
(function (I3KeypadFlags) {
    function is(node) {
        return ['I3KeypadFlags'].includes(node.nodeDefId);
    }
    I3KeypadFlags.is = is;
    function isImplementedBy(node) {
        return ['I3KeypadFlags'].includes(node.nodeDefId);
    }
    I3KeypadFlags.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new I3KeypadFlagsNode(isy, nodeInfo);
    }
    I3KeypadFlags.create = create;
    I3KeypadFlags.Node = I3KeypadFlagsNode;
    I3KeypadFlags.Class = I3KeypadFlagsNode;
    let Commands;
    (function (Commands) {
        Commands["updateMode"] = "GV0";
        Commands["updateProgramLock"] = "GV1";
        Commands["updateResumeDim"] = "GV2";
        Commands["updateRelayAtFullOn"] = "GV3";
        Commands["updateKeyBeep"] = "GV4";
        Commands["updateDisableRf"] = "GV5";
        Commands["updateButtonLock"] = "GV6";
        Commands["updateErrorBlink"] = "GV7";
        Commands["updateCleanupReports"] = "GV8";
        Commands["query"] = "QUERY";
        Commands["writeChanges"] = "WDU";
    })(Commands = I3KeypadFlags.Commands || (I3KeypadFlags.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["mode"] = "ST";
        Drivers["programLock"] = "GV1";
        Drivers["resumeDim"] = "GV2";
        Drivers["relayAtFullOn"] = "GV3";
        Drivers["keyBeep"] = "GV4";
        Drivers["disableRf"] = "GV5";
        Drivers["buttonLock"] = "GV6";
        Drivers["errorBlink"] = "GV7";
        Drivers["cleanupReports"] = "GV8";
        Drivers["responding"] = "ERR";
    })(Drivers = I3KeypadFlags.Drivers || (I3KeypadFlags.Drivers = {}));
})(I3KeypadFlags || (I3KeypadFlags = {}));
//# sourceMappingURL=I3KeypadFlags.js.map