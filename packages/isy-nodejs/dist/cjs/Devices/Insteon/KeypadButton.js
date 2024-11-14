"use strict";
/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeypadButton = exports.KeypadButtonNode = exports.nodeDefId = void 0;
const UOM_js_1 = require("../../Definitions/Global/UOM.js");
const index_js_1 = require("./index.js");
const Drivers_js_1 = require("../../Definitions/Global/Drivers.js");
const NodeFactory_js_1 = require("../NodeFactory.js");
exports.nodeDefId = "KeypadButton";
class KeypadButtonNode extends index_js_1.Base {
    commands = {
        QUERY: this.query,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "KeypadButton";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Drivers_js_1.Driver.create("ST", this, nodeInfo.property, { uom: UOM_js_1.UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Drivers_js_1.Driver.create("ERR", this, nodeInfo.property, { uom: UOM_js_1.UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async backlight(value) {
        return this.sendCommand("BL", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
exports.KeypadButtonNode = KeypadButtonNode;
NodeFactory_js_1.NodeFactory.register(KeypadButtonNode);
var KeypadButton;
(function (KeypadButton) {
    function is(node) {
        return node.nodeDefId === exports.nodeDefId;
    }
    KeypadButton.is = is;
    function create(isy, nodeInfo) {
        return new KeypadButtonNode(isy, nodeInfo);
    }
    KeypadButton.create = create;
    KeypadButton.Node = KeypadButtonNode;
})(KeypadButton || (exports.KeypadButton = KeypadButton = {}));
//# sourceMappingURL=KeypadButton.js.map