"use strict";
/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimmerLampSwitch = exports.DimmerLampSwitchNode = exports.nodeDefId = void 0;
const Drivers_js_1 = require("../../Definitions/Global/Drivers.js");
const UOM_js_1 = require("../../Definitions/Global/UOM.js");
const NodeFactory_js_1 = require("../NodeFactory.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
exports.nodeDefId = 'DimmerLampSwitch';
class DimmerLampSwitchNode extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        BRT: this.brighten,
        DIM: this.dim,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FDSTOP: this.fadeStop,
        QUERY: this.query,
        BEEP: this.beep,
        OL: this.updateOnLevel,
        RR: this.updateRampRate,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = 'DimmerLampSwitch';
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Drivers_js_1.Driver.create('ST', this, nodeInfo.state['ST'], { uom: UOM_js_1.UnitOfMeasure.Percent, label: 'Status', name: 'status' });
        this.drivers.OL = Drivers_js_1.Driver.create('OL', this, nodeInfo.state['OL'], { uom: UOM_js_1.UnitOfMeasure.Percent, label: 'On Level', name: 'onLevel' });
        this.drivers.RR = Drivers_js_1.Driver.create('RR', this, nodeInfo.state['RR'], { uom: UOM_js_1.UnitOfMeasure.Index, label: 'Ramp Rate', name: 'rampRate' });
        this.drivers.ERR = Drivers_js_1.Driver.create('ERR', this, nodeInfo.state['ERR'], { uom: UOM_js_1.UnitOfMeasure.Index, label: 'Responding', name: 'responding' });
    }
    async on(value) {
        return this.sendCommand('DON', { value: value });
    }
    async off() {
        return this.sendCommand('DOF');
    }
    async fastOff() {
        return this.sendCommand('DFOF');
    }
    async fastOn() {
        return this.sendCommand('DFON');
    }
    async brighten() {
        return this.sendCommand('BRT');
    }
    async dim() {
        return this.sendCommand('DIM');
    }
    async fadeUp() {
        return this.sendCommand('FDUP');
    }
    async fadeDown() {
        return this.sendCommand('FDDOWN');
    }
    async fadeStop() {
        return this.sendCommand('FDSTOP');
    }
    async query() {
        return this.sendCommand('QUERY');
    }
    async beep(value) {
        return this.sendCommand('BEEP', { value: value });
    }
    async updateOnLevel(value) {
        return this.sendCommand('OL', { value: value });
    }
    async updateRampRate(value) {
        return this.sendCommand('RR', { value: value });
    }
    async backlight(value) {
        return this.sendCommand('BL', { value: value });
    }
    async writeChanges() {
        return this.sendCommand('WDU');
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get onLevel() {
        return this.drivers.OL?.value;
    }
    get rampRate() {
        return this.drivers.RR?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
exports.DimmerLampSwitchNode = DimmerLampSwitchNode;
NodeFactory_js_1.NodeFactory.register(DimmerLampSwitchNode);
var DimmerLampSwitch;
(function (DimmerLampSwitch) {
    function is(node) {
        return node.nodeDefId === exports.nodeDefId;
    }
    DimmerLampSwitch.is = is;
    function create(isy, nodeInfo) {
        return new DimmerLampSwitchNode(isy, nodeInfo);
    }
    DimmerLampSwitch.create = create;
    DimmerLampSwitch.Node = DimmerLampSwitchNode;
})(DimmerLampSwitch || (exports.DimmerLampSwitch = DimmerLampSwitch = {}));
//# sourceMappingURL=DimmerLampSwitch.js.map