"use strict";
/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelayLampSwitch = exports.RelayLampSwitchNode = exports.nodeDefId = void 0;
const UOM_js_1 = require("../../Definitions/Global/UOM.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
const Drivers_js_1 = require("../../Definitions/Global/Drivers.js");
const NodeFactory_js_1 = require("../NodeFactory.js");
exports.nodeDefId = "RelayLampSwitch";
class RelayLampSwitchNode extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = 'RelayLampSwitch';
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Drivers_js_1.Driver.create('ST', this, nodeInfo.property, { uom: UOM_js_1.UnitOfMeasure.Percent, label: 'Status', name: 'status' });
        this.drivers.ERR = Drivers_js_1.Driver.create('ERR', this, nodeInfo.property, { uom: UOM_js_1.UnitOfMeasure.Index, label: 'Responding', name: 'responding' });
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
    async query() {
        return this.sendCommand('QUERY');
    }
    async beep(value) {
        return this.sendCommand('BEEP', { value: value });
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
    get responding() {
        return this.drivers.ERR?.value;
    }
}
exports.RelayLampSwitchNode = RelayLampSwitchNode;
NodeFactory_js_1.NodeFactory.register(RelayLampSwitchNode);
var RelayLampSwitch;
(function (RelayLampSwitch) {
    function is(node) {
        return node.nodeDefId === exports.nodeDefId;
    }
    RelayLampSwitch.is = is;
    function create(isy, nodeInfo) {
        return new RelayLampSwitchNode(isy, nodeInfo);
    }
    RelayLampSwitch.create = create;
    RelayLampSwitch.Node = RelayLampSwitchNode;
})(RelayLampSwitch || (exports.RelayLampSwitch = RelayLampSwitch = {}));
//# sourceMappingURL=RelayLampSwitch.js.map