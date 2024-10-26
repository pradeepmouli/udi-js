import { ISYEvent } from './ISYEvent.js';
import { EventType } from './EventType.js';
export declare class NodeEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
    nodeAddress: string;
    constructor(eventData: any);
}
//# sourceMappingURL=NodeEvent.d.ts.map