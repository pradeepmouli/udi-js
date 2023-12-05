"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYEvent = void 0;
class ISYEvent {
    action;
    eventInfo;
    constructor(eventData) {
        this.action = eventData.action;
        this.eventInfo = eventData.eventInfo;
    }
}
exports.ISYEvent = ISYEvent;
