import { NodeEvent } from './NodeEvent.js';
class PropertyChangedEvent extends NodeEvent {
    property;
    formattedValue;
    constructor(eventData) {
        super(eventData);
        this.property = eventData.control;
        this.formattedValue = eventData.fmtAct;
    }
}
//# sourceMappingURL=PropertyChangedEvent.js.map