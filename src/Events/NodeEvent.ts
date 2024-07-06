import { ISYEvent } from './ISYEvent.js';
import { t } from '../Definitions/Families.js';
import { EventType } from './EventType.js';
export class NodeEvent<TActionType, TEventType extends EventType> extends ISYEvent<TActionType, TEventType> {
	nodeAddress: string;
	constructor (eventData: any) {
		super(eventData);
		this.nodeAddress = eventData.node;
	}
}
