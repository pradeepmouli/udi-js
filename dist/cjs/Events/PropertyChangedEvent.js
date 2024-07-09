"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeEvent_js_1 = require("./NodeEvent.js");
class PropertyChangedEvent extends NodeEvent_js_1.NodeEvent {
    property;
    formattedValue;
    constructor(eventData) {
        super(eventData);
        this.property = eventData.control;
        this.formattedValue = eventData.fmtAct;
    }
}
