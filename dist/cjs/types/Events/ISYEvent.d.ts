import { EventType } from './EventType.js';
export declare class ISYEvent<TAction, TEventType extends EventType> {
    action: TAction;
    eventInfo: any;
    constructor(eventData: any);
}
