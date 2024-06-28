export class ISYEvent {
    action;
    eventInfo;
    constructor(eventData) {
        this.action = eventData.action;
        this.eventInfo = eventData.eventInfo;
    }
}
