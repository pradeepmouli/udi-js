import { ISYEvent } from './ISYEvent.js';
export class NodeEvent extends ISYEvent {
    nodeAddress;
    constructor(eventData) {
        super(eventData);
        this.nodeAddress = eventData.node;
    }
}
//# sourceMappingURL=NodeEvent.js.map