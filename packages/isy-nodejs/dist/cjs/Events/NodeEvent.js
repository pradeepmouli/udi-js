"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEvent = void 0;
const ISYEvent_js_1 = require("./ISYEvent.js");
class NodeEvent extends ISYEvent_js_1.ISYEvent {
    nodeAddress;
    constructor(eventData) {
        super(eventData);
        this.nodeAddress = eventData.node;
    }
}
exports.NodeEvent = NodeEvent;
//# sourceMappingURL=NodeEvent.js.map